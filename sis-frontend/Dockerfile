#Stage 1
FROM node:20-alpine as build
WORKDIR /app/react-sis
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

#step 2
FROM nginx:stable-alpine
COPY --from=build /app/react-sis/dist /usr/share/nginx/html
RUN mkdir /usr/share/nginx/html/sis-frontend &&  mkdir /usr/share/nginx/html/sis-frontend/assets
RUN mv /usr/share/nginx/html/assets/* /usr/share/nginx/html/sis-frontend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

