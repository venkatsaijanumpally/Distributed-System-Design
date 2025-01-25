# Distributed Search System for IMDB Dataset

## Overview
This project is a distributed system designed to perform fast and reliable searches on an extensive IMDB movie dataset. It leverages a robust architecture combining multiple technologies to ensure scalability, availability, and efficiency. The system integrates data pipeline components, distributed computing concepts, and load-balanced APIs to deliver high-performance search results.

---

## Features

### Distributed Data Pipeline
- **Kafka Messaging Queues**: Utilizes partitions and replication for efficient data streaming.
- **Python Processing Scripts**: Implements a master-slave concept and multiprocessing to handle large JSON datasets.
- **Logstash Integration**: Directs processed data into specific Elasticsearch indexes for storage and search.

### Scalable Search Architecture
- **Elasticsearch Nodes**: Includes sharding and replication to ensure faster searches and high availability.
- **Distributed Search Execution**: Django-based API supports distributed query handling.
- **React Frontend**: Provides a user-friendly interface for querying the IMDB dataset.

### Load Balancing
- **Django API**: Multiple nodes ensure even distribution of search requests.
- **Elasticsearch Clusters**: Configured for scalability and fault tolerance.

### AWS Deployment
- **Kubernetes Deployment**: YAML files configure and deploy Kafka, Zookeeper, Elasticsearch, Logstash, and application components on AWS.
- **Persistent Volumes**: Configured using AWS EFS for durable storage of logs and indexes.

---

## System Architecture

### Data Pipeline
1. **Producer**: Python scripts populate Kafka topics with IMDB data.
2. **Kafka and Zookeeper**: Manages messaging queues with partitioning and replication.
3. **Logstash**: Consumes Kafka topics and directs data into Elasticsearch indexes.

### Search
- **Elasticsearch Nodes**: Configured with multiple shards and replicas for distributed search.
- **Django API**: Acts as the backend interface for query execution.
- **React Frontend**: Allows users to input queries and view results.

### Deployment
- **Kubernetes**: YAML files manage deployment, scaling, and high availability.
- **Persistent Volume Storage**: AWS EFS ensures durability of logs and indexes.

---
