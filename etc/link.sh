#!/bin/sh

cd ./node_modules

set -e

rm -rf .bin
mkdir .bin
cd .bin
ln -s ../kiwi-bundle/bin/index.js kiwi

cd ..

rm -rf react react-native
ln -s kiwi-bundle/node_modules/{react,react-native} .
