FROM node:17-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 8080
