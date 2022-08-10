build-dev:
	cd crm-backend && $(MAKE) build-dev
	cd crm-backend && $(MAKE) build

run-dev:
	ENV=dev docker-compose -f docker-compose-dev.yml up

build-local:
	cd crm-frontend && $(MAKE) build-local
	cd crm-backend && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up

build-production:
	ENV=production
	cd crm-frontend && $(MAKE) build-production
	cd crm-backend && $(MAKE) build


run-production:
	ENV=production docker-compose -f docker-compose-production.yml up

stop:
	docker-compose down
