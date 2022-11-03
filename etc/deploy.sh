#!/bin/sh

VERSION=$npm_package_version

find ./README.md -type f -exec sed -i 's/"kiwi-bundle": ".*"/"kiwi-bundle": "'$VERSION'"/gm' {} +

find ./README.md -type f -exec sed -i 's/"kiwi-bundle-dev": ".*"/"kiwi-bundle-dev": "'$VERSION'"/gm' {} +

#yarn build

#npm publish
