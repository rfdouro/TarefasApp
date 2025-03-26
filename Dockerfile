FROM node:20-alpine

COPY . .

ENV SHOST="tarefasappnode.onrender.com"
ENV SCHEME="https"

RUN npm install


EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start-with-swagger-autogen" ]