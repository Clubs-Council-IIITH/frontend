FROM node:16.10.0-alpine3.11
USER root

WORKDIR /frontend
COPY . /frontend

RUN yarn
