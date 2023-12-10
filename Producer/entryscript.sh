#!/bin/sh

# Print a test statement
echo "Running the entry script..."

# Sleep for 15 seconds
sleep 10

# Run Kafka producer Python script
python3 producer.py

# Keep the container running
tail -f /dev/null