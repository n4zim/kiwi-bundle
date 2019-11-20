#!/bin/sh

set -e

mkdir -p lib

touch lib/index.js
chmod +x lib/index.js

tsc -w -p .
