# Use a smaller, more secure base image
FROM node@sha256:3ebf2875c188d22939c6ab080cfb1a4a6248cc86bae600ea8e2326aa03acdb8f

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
