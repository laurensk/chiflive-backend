FROM node:12

WORKDIR /opt/chiflive-backend

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=443
ENV DEBUG=FALSE

EXPOSE 443
CMD [ "node", "dist/App.js" ]