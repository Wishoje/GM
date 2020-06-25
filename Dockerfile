FROM node:10.16.3

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
COPY . ${APP_ROOT}

RUN npm install
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT=3000