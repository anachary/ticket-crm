 # Dockerfile for Node Express Backend api (development)

FROM node:14.15.3-alpine3.12

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 5000

CMD ["npm","start"]

