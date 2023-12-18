#!/bin/sh

# Sleep for 15 seconds
sleep 10

# Change working directory to Kafka home
cd $KAFKA_HOME

# Start Kafka in the background
kafka-server-start.sh config/server.properties &
#kafka-server-start.sh config/server1.properties &
#kafka-server-start.sh config/server2.properties &

sleep 25

# Create Kafka topic
kafka-topics.sh --create --topic first_topic --partitions 3 --replication-factor 1 --bootstrap-server localhost:9092

# Keep the script running
tail -f /dev/null


# Start the first Kafka instance in the background
#kafka-server-start.sh -daemon config/server1.properties &

# Start the second Kafka instance in the background
#kafka-server-start.sh -daemon config/server2.properties &