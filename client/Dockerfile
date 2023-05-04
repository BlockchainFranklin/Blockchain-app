# using node alpine as base image
FROM node:16-alpine as build

# working dir ./app
WORKDIR /app

# Copy react package.json
COPY ./package.json .

# install Vite
RUN npm install vite -g

# install dependencies
RUN npm install

# COPY client directory folder
COPY . .

# default command
CMD ["npm", "run", "dev"]
