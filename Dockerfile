# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
# COPY package*.json ./
COPY . .
RUN npm ci

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]
