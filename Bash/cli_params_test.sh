#!/bin/bash

# shellcheck disable=SC2034
# shellcheck disable=SC1091

help_text="
Purpose of this script is to test the 'config.sh' script.
    list:
        a - blah blah
        b - blah blah
        c - blah blah"

help_flags=(
    "-p, --port          Specify the port to listen on (default: 8080)"
)

. "$PWD/cli_params.sh"

if [ -z "${port+x}" ] || [ -z "$port" ]; then
    port="8080"
fi

echo ""
bgreen echo "Going to serve on port '$port' ..."
echo ""
