FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate && \
    npm run build && \
    npm run copy-swagger

EXPOSE 3000

# Run
CMD [ "npm", "run", "start" ]
