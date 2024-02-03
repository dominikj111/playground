#!/bin/bash

# shellcheck disable=SC1091
. ./env.sh

docker build \
    -t mysbt \
    --build-arg CENV="$CENV" \
    --build-arg CTZ="$CTZ" \
    --build-arg CLOCALE="$CLOCALE" \
    --build-arg GITEMAIL="$GITEMAIL" \
    --build-arg GITNAME="$GITNAME" \
    .
