FROM node:20-alpine
WORKDIR /app
COPY ./*.json /app/
COPY src /app/src
COPY ./.env /app/.env
RUN npm i

CMD ["npm","run","start"]