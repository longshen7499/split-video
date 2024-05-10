FROM node:18-alpine
# 安装 ffmpeg
RUN apk update && \
    apk add --no-cache ffmpeg
WORKDIR /app
COPY . /app
RUN npm install -g pnpm && \
    pnpm install && \
    pnpm build
EXPOSE 3000
CMD pnpm start:dev
