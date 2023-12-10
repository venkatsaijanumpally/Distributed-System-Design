from confluent_kafka import Producer, KafkaError
import json
import logging
import os

# Kafka server configuration
kafka_bootstrap_servers = os.environ.get('KAFKA_BOOTSTRAP_SERVER', 'kafka')
kafka_bootstrap_port = os.environ.get('KAFKA_BOOTSTRAP_PORT', '9092')

# Kafka topic to send messages to
kafka_topic = os.environ.get('KAFKA_TOPIC', 'first_topic')

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
    else:
        logging.info('Message delivered to {} [{}] at offset {} on {}'
                     .format(msg.topic(), msg.partition(), msg.offset(), msg.timestamp()))

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

if __name__ == '__main__':

    # Define the environment variable for the JSON file name
    json_file_name = os.environ.get('DATASET_FILE', 'part-01-test.json')
    
    # Define the path to the JSON file
    json_file_path = '/opt/Ingestdata/' + json_file_name + '.json'

    # Check if the file exists
    if not os.path.exists(json_file_path):
        logging.error('JSON file not found at the specified path: {}'.format(json_file_path))
    else:
        # Read the JSON file
        with open(json_file_path, 'r') as file:
            json_data = json.load(file)

        # Send each entry to Kafka
        produce_to_kafka(json_data)
