#!/bin/sh

set -e

rm -rf lib/

tsc -p .

chmod +x lib/bin/index.js
