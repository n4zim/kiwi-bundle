FROM node:alpine
LABEL maintainer="nlachter@gmail.com"

WORKDIR /usr/src/app

ONBUILD COPY package.json ./
ONBUILD RUN npm install --only=production
ONBUILD COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
