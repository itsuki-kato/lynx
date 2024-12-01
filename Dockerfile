# Base image
FROM node:21-bookworm-slim AS base

RUN apt-get update && \
    apt-get install -y locales curl

RUN locale-gen ja_JP.UTF-8

RUN localedef -f UTF-8 -i ja_JP ja_JP

ENV LANG=ja_JP.UTF-8

ENV TZ=Asia/Tokyo

USER node

# Create app directory
WORKDIR /usr/src/app

USER root
RUN mkdir /usr/src/app/node_modules && chown -R node:node /usr/src/app/node_modules
RUN apt-get install -y git

USER node

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

EXPOSE 3000

FROM base AS local
ENV NODE_ENV development
CMD ["npm", "run", "dev"]

FROM base AS stg
# productionに指定しないと、nextのbuildができないためproductionを指定
ENV NODE_ENV production
RUN npm run build:stg
CMD ["npm", "run", "start"]

FROM base AS prod
ENV NODE_ENV production
RUN npm run build:prod
CMD ["npm", "run", "start"]