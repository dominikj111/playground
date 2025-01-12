#!/bin/bash

docker run --rm -it -v "$(pwd):/src" -w /src python:3.9.20-bookworm /bin/bash -c "pip install latexcheck && latexcheck main.tex"
