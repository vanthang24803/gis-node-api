FROM node:alpine

WORKDIR /app

RUN npm i -g pnpm

COPY package.json ./

RUN pnpm i

COPY prisma ./prisma

RUN npx prisma generate

COPY  . .  

EXPOSE 8000

CMD [ "pnpm" , "start" ]