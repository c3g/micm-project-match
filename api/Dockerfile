FROM node:12-alpine
RUN mkdir -p /var/micm/files
WORKDIR /usr/src/api
COPY ./api/package*.json ./
RUN npm install --silent
COPY ./api/ .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "serve"]
