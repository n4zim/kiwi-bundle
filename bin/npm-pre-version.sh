#!/bin/sh

set -e

git pull

if [ $(git rev-parse --abbrev-ref HEAD) != master ]; then
  echo '/!\\ YOU MUST CHECKOUT ON MASTER'
  exit 1
fi

npm test

npm run build

git add --all
git add --force lib/
