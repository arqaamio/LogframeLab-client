# FROM node:13 as build-step
# WORKDIR /app
# COPY package.json ./
# COPY . .
# RUN npm install
# # Build application for production
# RUN node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --prod --buildOptimizer

FROM nginx:latest as prod-stage
COPY ./dist/client /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./cert/ /etc/nginx/cert
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]