# Use Node.js as the build environment
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Use nginx to serve the built application
FROM nginx:alpine

WORKDIR /app

# If your build output is 'dist', keep as is. Otherwise, change 'dist' to your actual output folder.
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]