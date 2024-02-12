#Stage 1
FROM node:20-alpine as build
WORKDIR /app/react-sis
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "preview"]

