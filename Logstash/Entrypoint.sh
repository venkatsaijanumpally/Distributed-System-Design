#!/bin/bash

# Run the Python script to wait for Elasticsearch and create the index
python3 /usr/share/logstash/wait_for_elasticsearch.py

# Start Logstash
exec /usr/share/logstash/logstash/bin/logstash -f /usr/share/logstash/pipeline/logstash.conf --path.settings /usr/share/logstash/config
