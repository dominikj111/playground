#!/bin/bash

set -eu pipefail

echo "Hello, $(whoami) in PHP container '~ -> $(pwd)'!"

if [ -z "$(ls -A /wwwroot/blog)" ]; then
    echo "Initializing the Wordpress site ..."
    (
        cd /wwwroot/blog &&
            cp -r /wordpress/* . &&
            rm -rf wp-config-sample.php readme.html license.txt
    )
fi

if [ -z "$(ls -A /wwwroot/blog | grep wp-config.php)" ]; then
    echo "Refreshing the wp-config.php ..."
    (
        cd &&
            cp /wordpress-configs/wp-config.php /wwwroot/blog/wp-config.php
    )
fi

php-fpm
