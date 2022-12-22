export PROJECTNAME=$(shell basename "$(PWD)")

.SILENT: ;               # no need for @

setup: ## Setup application
	python3.11 -m venv venv && venv/bin/python3 -m pip install -r requirements.txt
	venv/bin/python3 -m pip install --upgrade pip

deps: ## Re-install dependencies
	venv/bin/python3 -m pip install -r requirements.txt
	venv/bin/python3 -m pip install --upgrade pip

build: ## Build application
	echo "Steps required to build sample application"

test: ## Test application
	pytest *.py

.PHONY: help
.DEFAULT_GOAL := help

help: Makefile
	echo
	echo " Choose a command run in "$(PROJECTNAME)":"
	echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	echo