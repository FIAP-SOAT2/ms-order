FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4003

RUN apt-get update -y && apt-get install -y openssl

# Run
CMD [ "npm", "run", "start" ]
