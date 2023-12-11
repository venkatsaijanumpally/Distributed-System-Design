#!/bin/bash

if kafka-topics.sh --list --bootstrap-server localhost:9092 | grep -q 'first_topic'; then
    exit 0  # Success, topic found
else
    exit 1  # Failure, topic not found
fi
