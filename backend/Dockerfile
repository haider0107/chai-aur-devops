FROM node:22

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install


# Copy app files
COPY . .

# Expose port
EXPOSE 8080

# Start in dev mode with nodemon
CMD ["npm", "run", "dev"]
