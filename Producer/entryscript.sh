#!/bin/sh

# Print a test statement
echo "Running the entry script..."

# Run Kafka producer Python script
python producer.py

# Keep the container running
tail -f /dev/null