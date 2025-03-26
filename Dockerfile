FROM node:20-alpine

COPY . .

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start-with-swagger-autogen" ]