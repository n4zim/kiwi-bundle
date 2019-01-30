#!/bin/sh

NM="./node_modules"
BIN="$NM/.bin/webpack-dev-server"
BUNDLE="$NM/kiwi-bundle"
CONFIG="$BUNDLE/etc/webpack/development.js"

eval $BIN --context=$BUNDLE --config=$CONFIG
