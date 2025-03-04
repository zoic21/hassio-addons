ARG BUILD_FROM
FROM ${BUILD_FROM}

# Copy our custom entrypoint script
COPY rootfs /

# Make the script executable
RUN chmod a+x /etc/services.d/open-webui/run

# The s6-overlay will automatically use our custom script 