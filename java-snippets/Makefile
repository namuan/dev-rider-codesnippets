export PROJECTNAME=$(shell basename "$(PWD)")

.SILENT: ;               # no need for @

setup: ## Setup application
	./mvnw clean

build: setup ## Build application
	./mvnw compile

test: build ## Test application
	./mvnw test

.PHONY: help
.DEFAULT_GOAL := help

help: Makefile
	echo
	echo " Choose a command run in "$(PROJECTNAME)":"
	echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	echo