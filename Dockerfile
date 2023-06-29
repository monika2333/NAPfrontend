# FROM指明基础镜像，当需要采用多个基础镜像时可以指定多次，这里是使用最新的node镜像作为构建项目时的镜像
FROM node:latest as builder
# 设置工作目录在/app文件夹下
WORKDIR /app
# 复制指令
COPY package.json .
# 前端vue工程的一系列构建指令，它们都以RUN开头，后面可以直接跟在shell中执行的命令
# 全局安装pnpm
RUN npm install -g pnpm
# 安装vue-demi
RUN npm install vue-demi
# 使用pnpm安装各种modules
RUN pnpm install
COPY . .
# 将vue代码打包构建到dist
RUN pnpm build

# 采用最新的nginx镜像作为运行时的镜像
FROM nginx:latest
# 作者等注释信息
MAINTAINER test
# 删除基础镜像中的Nginx配置文件替换成自己写的
RUN rm /etc/nginx/conf.d/default.conf  
ADD default.conf /etc/nginx/conf.d/
# 将上一步中打包好的vue项目（dist）复制到基础镜像中Nginx配置文件的指定路径下 
COPY --from=builder /app/dist /usr/share/nginx/html
