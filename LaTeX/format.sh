#!/bin/bash

docker run --rm --platform linux/amd64 -v "$(pwd)/main.tex:/main.tex" ghcr.io/cmhughes/latexindent.pl -s -w main.tex
