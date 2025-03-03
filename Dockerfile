# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Ensure PostgreSQL uses JavaScript bindings
ENV PGSSLMODE=require

# Install dependencies
RUN npm install --only=production --no-optional

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
