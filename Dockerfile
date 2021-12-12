FROM node:14.10.1

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 7000

CMD [ "npm", "run", "dev" ]
