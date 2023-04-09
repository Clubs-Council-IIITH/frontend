#!/usr/bin/env bash

# install dependencies
yarn install

# Update Browser List
npx update-browserslist-db@latest

# transpile app into static files
yarn build
