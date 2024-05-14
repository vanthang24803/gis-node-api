FROM node:latest-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i -g pnpm 

RUN pnpm install

COPY  . .

EXPOSE 8080

CMD [ "npm", "start" ]