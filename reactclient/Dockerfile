# Use an official Node runtime as a base image with version 18.12.0
FROM node:18.12.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local source code to the container
COPY ./src /usr/src/app/src
COPY ./public /usr/src/app/public

# Build the React app
RUN npm run build

EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]