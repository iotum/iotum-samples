FROM node:lts-slim

WORKDIR /iotum-samples

COPY . /iotum-samples/

RUN npm install

ENV HOST=localhost
ENV PORT=3000

CMD ["npm", "start"]
