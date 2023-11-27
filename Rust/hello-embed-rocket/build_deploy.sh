docker run -it --rm \
    --volume $(pwd):/usr/src/myapp \
    --volume $(pwd)/cargo/registry:/usr/local/cargo/registry \
    --volume $(pwd)/cargo/git:/usr/local/cargo/git \
    -w /usr/src/myapp \
    rust:1.74.0-bookworm \
    bash -c "cargo build --release";

ssh acernetbook "rm -f ~/Downloads/hello-embed-rocket";

scp -i ~/.ssh/raspberrypi3 ./target/release/hello-embed-rocket pipi@192.168.0.7:/home/pipi/Downloads;
scp -i ~/.ssh/raspberrypi3 ./Rocket.toml pipi@192.168.0.7:/home/pipi/Downloads;
