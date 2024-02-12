#Stage 1
FROM node:20-alpine as build
WORKDIR /app/react-sis
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

#step 2
FROM nginx:stable-alpine
COPY --from=build dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

