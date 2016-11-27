NODE_BIN = ./node_modules/.bin

.PHONY: build lint
all: lint build

build:
	$(NODE_BIN)/webpack
	cp node_modules/phaser/build/phaser.min.js build/phaser.min.js

lint:
	$(NODE_BIN)/tslint --project ./tsconfig.json

run-server:
	$(NODE_BIN)/concurrently "$(NODE_BIN)/webpack-dev-server -w" "$(NODE_BIN)/webpack -w"
