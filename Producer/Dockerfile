FROM python:3.9.11-alpine3.15 

# upgrade pip to the latest version
RUN apk --no-cache upgrade \
    && pip install --upgrade pip \
    && apk --no-cache add tzdata build-base gcc libc-dev g++ make git bash

RUN git clone https://github.com/edenhill/librdkafka.git && cd librdkafka \
    && git checkout tags/v2.2.0 && ./configure --clean \
    && ./configure --prefix /usr/local \
    && make && make install
RUN pip install confluent-kafka==2.2.0

WORKDIR /opt

COPY entryscript.sh /opt/entryscript.sh
COPY producer.py /opt/producer.py

# Set execute permissions for the entrypoint script
RUN chmod +x /opt/producer.py
# Set execute permissions for the entrypoint script
RUN chmod +x /opt/entryscript.sh

# Define the entry point for the container
CMD ["/opt/entryscript.sh"]
