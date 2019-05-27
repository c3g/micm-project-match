FROM node:10-alpine AS build
WORKDIR /usr/src/web
COPY ./web/package*.json ./
ENV SASS_BINARY_NAME linux-x64-64
RUN npm install --production --silent
COPY ./web/ .
RUN npm run build

FROM nginx:1.10.3
COPY --from=build /usr/src/web/dist/* /usr/share/nginx/html/
ADD ./.nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
