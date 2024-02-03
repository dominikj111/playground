#!/bin/bash

docker run \
    --interactive \
    --tty \
    --volume "$(pwd)"/cache:/root/.cache \
    --volume "$(pwd)"/sbt:/root/.sbt \
    --volume "$(pwd)"/server:/server \
    --publish 9000:9000 \
    --rm mysbt \
    /bin/bash -c "sbt run"
