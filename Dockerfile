# Use a smaller, more secure base image
FROM node:alpine3.19

# Install nodemon globally
RUN npm install -g nodemon

# Set working directory
WORKDIR /usr/src/app

# Copy package files first for layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Make port 8080 available
EXPOSE 8080

# Use a safer and more explicit CMD format
CMD ["sh", "./start.sh"]
