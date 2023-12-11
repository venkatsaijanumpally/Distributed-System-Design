# Use an Ubuntu-based image
FROM ubuntu:20.04
USER root
# Install necessary dependencies (Python, OpenJDK, Logstash)
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    python3 python3-pip openjdk-11-jre-headless && \
    pip3 install requests && \
    rm -rf /var/lib/apt/lists/*

# Set up Logstash
RUN mkdir -p /usr/share/logstash
WORKDIR /usr/share/logstash

# Download and extract Logstash
ADD https://artifacts.elastic.co/downloads/logstash/logstash-7.17.15-linux-x86_64.tar.gz .
RUN tar -zxvf logstash-7.17.15-linux-x86_64.tar.gz && \
    rm logstash-7.17.15-linux-x86_64.tar.gz && \
    mv logstash-7.17.15 logstash

# Set the Logstash pipeline.id to 'main' (required for Logstash 7.x)
ENV LS_PIPELINE_ID="main"

# Expose the Logstash monitoring API port
EXPOSE 9600

# Copy the Python script
COPY wait_for_elasticsearch.py /usr/share/logstash/wait_for_elasticsearch.py
COPY Entrypoint.sh /usr/share/logstash/Entrypoint.sh

# Set execute permissions for the entrypoint script
RUN chmod +x /usr/share/logstash/Entrypoint.sh

RUN chown root:root /usr/share/logstash/Entrypoint.sh
RUN chmod 4755 /usr/share/logstash/Entrypoint.sh

# Use entrypoint.sh as the entry point
ENTRYPOINT ["/usr/share/logstash/Entrypoint.sh"]
