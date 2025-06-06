FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.production .env

RUN npm run build

RUN rm .env

EXPOSE 3000

CMD ["npm", "start"]