#FROM node:alpine as base
#RUN npm install -g yarn
#RUN apk add autoconf automake g++ gcc make

FROM node:latest as builder
WORKDIR /build

# Install
ONBUILD ADD package.json yarn.lock ./
ONBUILD RUN yarn install
ONBUILD COPY . .

# Test
ONBUILD RUN yarn test

# Build
ONBUILD RUN yarn build
