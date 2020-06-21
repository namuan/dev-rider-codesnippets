export PROJECTNAME=$(shell basename "$(PWD)")

.SILENT: ;               # no need for @

clean: ## Clean package
	./gradlew clean

dev: ## Run tests with dev profile
	SPRING_PROFILES_ACTIVE=dev ./gradlew test

integration: ## Run tests with integration profile
	SPRING_PROFILES_ACTIVE=integration ./gradlew test

.PHONY: help
.DEFAULT_GOAL := help

help: Makefile
	echo
	echo " Choose a command run in "$(PROJECTNAME)":"
	echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	echo