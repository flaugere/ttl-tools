# Use Node.js image
FROM node:24 

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY config ./config
COPY email ./email
COPY quiz ./quiz
COPY services ./services
COPY utils ./utils
COPY main.js ./

# Install cron
RUN apt-get update && apt-get install -y cron && rm -rf /var/lib/apt/lists/*

# Create a crontab file to run the app every minute
RUN echo "* * * * * cd /app && /usr/local/bin/node main.js >> /proc/1/fd/1 2>&1" | crontab -

# Run cron and stream cron output to stdout for docker logs
CMD ["sh", "-c", "cron -f"]
