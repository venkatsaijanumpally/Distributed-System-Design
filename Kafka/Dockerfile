# Use CentOS as the base image
FROM centos:8

RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*


RUN yum update -y

# Update the system and install required dependencies
RUN yum install -y java-1.8.0-openjdk java-1.8.0-openjdk-devel

# Install Python and other necessary packages
RUN yum install -y python3 python3-pip

RUN yum install wget -y

# Download and install Apache Kafka
WORKDIR /opt
RUN wget https://archive.apache.org/dist/kafka/3.6.0/kafka_2.12-3.6.0.tgz && \
    tar -xzf kafka_2.12-3.6.0.tgz && \
    rm kafka_2.12-3.6.0.tgz

# Set the environment variables for Kafka
ENV KAFKA_HOME /opt/kafka_2.12-3.6.0
ENV PATH $PATH:$KAFKA_HOME/bin

# Create required directories
RUN mkdir -p $KAFKA_HOME/data/zookeeper $KAFKA_HOME/data/kafka $KAFKA_HOME/data/Ingestdata $KAFKA_HOME/data/Producer

# Expose Kafka ports
EXPOSE 9092 9093

# Copy the entryscript.sh file into the image
COPY ./entryscript.sh /opt/kafka_2.12-3.6.0/entryscript.sh

# Set executable permissions for the entry script
RUN chmod +x /opt/kafka_2.12-3.6.0/entryscript.sh

# Start Kafka (adjust as needed)
CMD ["/opt/kafka_2.12-3.6.0/entryscript.sh"]
