#!/usr/bin/env bash

# install dependencies
yarn install

# Update Browser List
npx update-browserslist-db@latest

# start react development server
yarn start
