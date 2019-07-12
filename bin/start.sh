#!/bin/sh

set -e

rm -rf lib/

mkdir -p lib/bin
touch lib/bin/index.js
chmod +x lib/bin/index.js

tsc -w -p .
