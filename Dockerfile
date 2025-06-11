# Step 1: Build the React app
FROM node:22 AS vite-build

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

# Step 2: Serve the app using Nginx
FROM nginx:alpine
# Uses the templating engine provided by the nginx docker image

# details: https://github.com/docker-library/docs/tree/master/nginx#using-environment-variables-in-nginx-configuration
COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=vite-build /app/dist /usr/share/nginx/html

# Expose port 8080 to the Docker host, so we can access it
# from the outside. This is a placeholder; Cloud Run will provide the PORT environment variable at runtime.
ARG PORT=8080
ENV NGINX_PORT=${PORT}
EXPOSE ${NGINX_PORT}
CMD ["nginx", "-g", "daemon off;"]
