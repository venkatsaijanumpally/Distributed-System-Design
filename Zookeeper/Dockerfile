# Use the official Confluent ZooKeeper image as the base
FROM confluentinc/cp-zookeeper:6.2.0

# Expose ZooKeeper client ports
EXPOSE 2181 2185

# Add custom health-check script
COPY health-check.sh /usr/bin/health-check.sh
RUN chmod +x /usr/bin/health-check.sh

# Health check endpoint
HEALTHCHECK --interval=5s CMD /usr/bin/health-check.sh

# Entry point script
COPY entrypoint.sh /etc/confluent/docker/run
RUN chmod +x /etc/confluent/docker/run
CMD ["/etc/confluent/docker/run"]
