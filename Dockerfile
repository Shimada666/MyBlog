FROM node:16-slim AS build
WORKDIR /app
COPY . /app
ENV NPM_REGISTRY https://registry.npm.taobao.org
RUN npm install -g pnpm --registry=$NPM_REGISTRY && pnpm i && pnpm docs:build

FROM nginx:stable-alpine
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
