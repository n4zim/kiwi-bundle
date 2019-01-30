#!/bin/sh

NM="./node_modules"
BIN="$NM/.bin/webpack"
BUNDLE="$NM/kiwi-bundle"
CONFIG="$BUNDLE/etc/webpack/production.js"

eval $BIN -p --context=$BUNDLE --config=$CONFIG
