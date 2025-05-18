FROM node:20-alpine3.18

WORKDIR /usr/src/app

RUN apk add --no-cache libssl1.1

COPY package*.json ./
COPY yarn.lock ./

CMD apt install yarn

RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn run build
