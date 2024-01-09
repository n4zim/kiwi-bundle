#!/bin/sh

set -e

VERSION=$npm_package_version

find ./README.md -type f -exec sed -i 's/"kiwi-bundle": ".*"/"kiwi-bundle": "'$VERSION'"/gm' {} +
find ./README.md -type f -exec sed -i 's/"kiwi-bundle-dev": ".*"/"kiwi-bundle-dev": "'$VERSION'"/gm' {} +

find ./dev/package.json -type f -exec sed -i 's/"version": ".*"/"version": "'$VERSION'"/gm' {} +

yarn build
yarn publish --non-interactive

cd dev
yarn publish --non-interactive
