.PHONY: build-all build-lib build-bin test clean help check outdated doc lint format run watch

help:
	@echo "Available targets:"
	@echo "  build-all: build the library and executable"
	@echo "  build-lib: build the library"
	@echo "  build-bin: build the executable"
	@echo "  run: will run the project"
	@echo "  run-watch: will watch and re-run the project"
	@echo "  test: will run the tests, but it depends on build"
	@echo "  check: will run the tests without dependency"
	@echo "  clean: will clean the build"
	@echo "  outdated: will check for outdated dependencies"
	@echo "  doc: will generate the documentation"
	@echo "  lint: will run clippy"
	@echo "  format: will run cargo fmt"

build-all: target/debug/myproject

target/debug/myproject: src/*.rs
	cargo build

build-lib:
	cargo build --lib

build-bin:
	cargo build --bin template-bin-name

run:
	cargo run --bin template-bin-name

run-watch:
	watchexec --on-busy-update=restart -w src make run

test: target/debug/myproject
	cargo test

check:
	cargo check

clean:
	cargo clean

outdated: 
	cargo outdated

doc:
	cargo doc --document-private-items --no-deps

lint:
	cargo clippy

format:
	cargo fmt
