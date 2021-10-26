FROM node:lts-alpine as build-stage

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install
RUN npm run prod

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /src/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]