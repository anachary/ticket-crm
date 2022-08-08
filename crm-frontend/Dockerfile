# Dockerfile for client

# Stage 1: Build react client
FROM node:14.15.3-alpine3.12

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install 


# copy local files to app folder
COPY . .

ARG REACT_APP_BACKEND_SERVER_IP
ENV REACT_APP_BACKEND_SERVER_IP = 'localhost'


ARG REACT_APP_PORT
ENV REACT_APP_PORT = 5000


EXPOSE 3000


CMD ["npm","start"]