# How to build on MacOS

## Prerequisites

`brew install openssl xz gdbm`

## Build steps

1. Download Python source from [www.python.org](https://www.python.org/downloads/) and extract it to the `assets` directory.
2. Go to `./assets/Python-x.x.x/` and do the build.
   1. `CPPFLAGS="-I$(brew --prefix)/include" LDFLAGS="-L$(brew --prefix)/lib" ./configure --enable-shared --prefix=$(pwd)/dist --with-openssl=$(brew --prefix openssl)`
   2. `make -s -j2`
   3. `make install`
3. From the project root, run `PYTHONHOME="$(pwd)/assets/Python-3.8.19/dist" DYLD_LIBRARY_PATH="$(pwd)/assets/Python-3.8.19/dist/lib" PYO3_PYTHON="$(pwd)/assets/Python-3.8.19/dist/bin/python3" cargo run`.
