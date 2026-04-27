# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
# Defaults for local docker-compose; Railway overrides PORT and SERVER_URL
ENV PORT=80
ENV SERVER_URL=http://server:3001
# Only substitute our placeholders so nginx variables ($host etc.) are preserved
ENV NGINX_ENVSUBST_FILTER=^(PORT|SERVER_URL)$
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
