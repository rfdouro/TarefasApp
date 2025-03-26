FROM node:20-alpine

COPY . .


RUN npm install


EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start-with-swagger-autogen" ]