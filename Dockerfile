FROM node:23-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

CMD apt install yarn

RUN yarn

COPY . .

RUN yarn run build
