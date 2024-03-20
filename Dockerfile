FROM node:20.9.0-bullseye-slim as node

WORKDIR /app

COPY package.json /app/package.json
RUN npm install --omit=dev

COPY . /app
RUN npm run build

FROM nginx:alpine3.18 as nginx
COPY --from=node /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf #
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
