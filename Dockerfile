FROM node:16.4.1-alpine3.11
USER root

WORKDIR /frontend
COPY . /frontend

RUN yarn
RUN yarn build
