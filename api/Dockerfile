FROM node:10-alpine
WORKDIR /usr/src/api
COPY ./api/package*.json ./
RUN npm install --production --silent
COPY ./api/ .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "serve"]
