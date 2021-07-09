# syntax=docker/dockerfile:1

FROM node:lts-alpine3.10

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN sh env-setup.sh

EXPOSE 3000

CMD [ "node", "app.js" ]
