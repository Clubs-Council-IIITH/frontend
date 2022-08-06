# [base] image
FROM node:16.16.0-slim as base

WORKDIR /frontend

# [production] image
FROM base as prod

# copy all files to container
COPY . /frontend/
