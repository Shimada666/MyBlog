FROM ccr.ccs.tencentyun.com/corgi/node:16-slim AS build
WORKDIR /app
COPY . /app

RUN apt update && apt install -y git
RUN pnpm i && pnpm docs:build

FROM nginx:stable-alpine
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
