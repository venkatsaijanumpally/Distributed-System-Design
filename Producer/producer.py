from confluent_kafka import Producer, KafkaError
import json
import logging
import os
import ijson
import itertools
from multiprocessing import Queue, Process

# Kafka server configuration
kafka_bootstrap_servers = os.environ.get('KAFKA_BOOTSTRAP_SERVER')
kafka_bootstrap_port = os.environ.get('KAFKA_BOOTSTRAP_PORT')

# Kafka topic to send messages to
kafka_topic = os.environ.get('KAFKA_TOPIC')

producer_config = {
    'bootstrap.servers': f'{kafka_bootstrap_servers}:{kafka_bootstrap_port}',
}

# Configure logging to write both to console and a log file
logging.basicConfig(
    filename='kafka_producer.log',
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

def delivery_report(err, msg):
    """Delivery report callback function."""
    if err is not None:
        logging.error('Message delivery failed: {}'.format(err))
    #else:
        # log_message = 'Message delivered to {} [{}] at offset {} on {}'.format(
        #     msg.topic(), msg.partition(), msg.offset(), msg.timestamp()
        # )
        # logging.info(log_message)

def produce_to_kafka(json_data):
    producer = Producer(producer_config)

    try:
        # Produce each JSON entry to the Kafka topic
        for entry in json_data:
            # Convert the entry to a JSON string
            json_message = json.dumps(entry)
            
            # Produce the message to the Kafka topic
            producer.produce(kafka_topic, key=entry["review_id"], value=json_message, callback=delivery_report)

        # Wait for any outstanding messages to be delivered and delivery reports to be received
        producer.flush()
    except Exception as e:
        logging.error('Error: {}'.format(str(e)))
    finally:
        producer.flush()



def split_json(input_file, output_folder, output_prefix, chunk_size=1000, file_queue=None):
    with open(input_file, 'r') as infile:
        # Create an iterator for parsing the JSON file incrementally
        json_parser = ijson.items(infile, 'item')

        # Create the output folder if it doesn't exist
        os.makedirs(output_folder, exist_ok=True)

        for i, chunk_data in enumerate(iter(lambda: list(itertools.islice(json_parser, chunk_size)), []), start=1):
            output_file = os.path.join(output_folder, f"{output_prefix}_{i}.json")
            with open(output_file, 'w') as outfile:
                json.dump(chunk_data, outfile, indent=2)

            # Add the file to the queue
            if file_queue:
                file_queue.put(output_file)
                
def worker(file_queue, result_queue):
    while not file_queue.empty():
        file_path = file_queue.get()
        print(f"Worker processing file: {file_path}")

        # Perform processing on the file (replace with your logic)
        # Example: Read the file and print its content
        with open(file_path, 'r') as infile:
            file_content = json.load(infile)
            produce_to_kafka(file_content)
        # Add result to the result queue (replace with your logic)
        result_queue.put(f"Processed {file_path}")



if __name__ == '__main__':

    print("IN MAIN PRODUCER")
    file_range = int(os.environ.get('FILE_RANGE', '1'))
    # Check if all files from 1 to file_range exist
    all_files_exist = all(os.path.exists(f'/opt/Ingestdata/part-0{i}.json') for i in range(1, file_range+1))

    if not all_files_exist:
        missing_files = [f'/opt/Ingestdata/part-0{i}.json' for i in range(1, file_range+1) if not os.path.exists(f'/opt/Ingestdata/part-0{i}.json')]
        print("FILES NOT FOUND: ", missing_files)
        logging.error('Not all required JSON files found.')
    else:     
        output_folder = '/data/chunks'
        chunk_size = 30000

        # Create a queue to store the file names
        file_queue = Queue()
        
        # Create a queue to store worker results
        result_queue = Queue()

        # Split the JSON file and add files to the queue
        for i in range(1,file_range+1):
            print("Splitting file " + str(i))
            json_file_name = 'part-0' + str(i)
            input_json_file = '/opt/Ingestdata/' + json_file_name + '.json'
            output_file_prefix = json_file_name + "_chunk"
            split_json(input_json_file, output_folder, output_file_prefix, chunk_size, file_queue)
            
        # Print the files in the queue
        #while not file_queue.empty():
        #    file_name = file_queue.get()
        #    print(f"File added to the queue: {file_name}")
        
        # Create worker processes
        num_workers = 2  # Adjust as needed
        workers = [Process(target=worker, args=(file_queue, result_queue)) for _ in range(num_workers)]

        # Start worker processes
        for worker_process in workers:
            worker_process.start()

        # Wait for all worker processes to finish
        for worker_process in workers:
            worker_process.join()

        # Print results from the result queue
        while not result_queue.empty():
            print(result_queue.get())
    