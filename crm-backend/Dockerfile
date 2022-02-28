 # Dockerfile for Node Express Backend api (development)

FROM node:14.15.3-alpine3.12

ARG NODE_ENV=development

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./


# Copy app source code
COPY . .

RUN rm -fr node_modules
RUN npm install
RUN npm install -g nodemon  #this was needed in order to make it work

CMD ["npm","start"]

