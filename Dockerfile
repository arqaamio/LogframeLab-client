<<<<<<< HEAD
# FROM node:13 as build-step
# WORKDIR /app
# COPY package.json ./
# COPY . .
# RUN npm install
# # Build application for production
# RUN node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --prod --buildOptimizer

FROM nginx:latest as prod-stage
COPY ./dist/client /usr/share/nginx/html
=======
#FROM node:13 as build-step
#WORKDIR /app
#COPY package.json ./
#COPY . .
#RUN npm install
# Build application for production
#RUN node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --prod --buildOptimizer

FROM nginx:latest as prod-stage
#COPY --from=build-step /app/dist/client /usr/share/nginx/html
COPY dist/client /usr/share/nginx/html
>>>>>>> 64c58f1caedb90c9d9fc817176530319682ccee4
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]