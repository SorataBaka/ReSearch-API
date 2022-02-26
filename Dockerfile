FROM node:16.13.0

ENV NODE_OPTIONS=--max_old_space_size=512

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

COPY . .

CMD [ "npm", "start" ]