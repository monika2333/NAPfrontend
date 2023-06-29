# FROM node:16-alpine as build-stage

# WORKDIR /app
# RUN corepack enable
# RUN corepack prepare pnpm@7.32.1 --activate

# RUN npm config set registry https://registry.npmmirror.com

# COPY .npmrc package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile

# COPY . .
# RUN pnpm build

# FROM nginx:stable-alpine as production-stage

# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:latest as builder
WORKDIR /app
COPY package.json .
RUN npm install -g pnpm
RUN npm install vue-demi
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:latest
MAINTAINER ps
RUN rm /etc/nginx/conf.d/default.conf  
ADD default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html
