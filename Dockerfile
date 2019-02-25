FROM node:alpine
LABEL maintainer="nazim@blueforest.fr"

WORKDIR /usr/src/app

ONBUILD COPY package.json ./
ONBUILD RUN npm install --production
ONBUILD COPY . .
ONBUILD RUN npm run build
ONBUILD RUN npm prune --production

EXPOSE 8080
CMD [ "npm", "start" ]
