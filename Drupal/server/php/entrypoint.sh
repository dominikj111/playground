#!/bin/bash

set -eu pipefail

echo "Hello, $(whoami) in PHP container '~ -> $(pwd)'!"

php-fpm
