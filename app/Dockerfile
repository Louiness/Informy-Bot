FROM node:17-alpine

WORKDIR /usr/src/app

COPY /app/package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
