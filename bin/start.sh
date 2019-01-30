#!/bin/sh

#COMMAND=$(node ./node_modules/kiwi-bundle/lib/utils/output-cmd-webpack-start.js $PWD)

NM="./node_modules"
BIN="$NM/.bin/webpack-dev-server"
BUNDLE="$NM/kiwi-bundle"
CONFIG="$BUNDLE/etc/webpack/development.js"

COMMAND="$BIN --context=$BUNDLE --config=$CONFIG"

eval $COMMAND
