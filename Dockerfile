# [base] image
FROM node:18.7.0-slim as base

WORKDIR /frontend

# [production] image
FROM base as prod

# copy all files to container
COPY . /frontend/
