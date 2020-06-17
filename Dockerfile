FROM node:13 as build-step
WORKDIR /app
COPY package.json ./
RUN npm install -g @angular/cli
COPY . .
# Build application for production
RUN npm run build -- --prod

FROM nginx:latest as prod-stage
COPY --from=build-step /app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]