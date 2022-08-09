build-dev:
	docker build -t react-app .

run:
	docker run -i -d -p 3000:3000 react-app

build-production:
	docker build -t react-app-production:production	--build-arg CADDYFILE=Caddyfile.production --build-arg REACT_APP_BACKEND_SERVER_IP=ticket-crm-capstone.me --build-arg REACT_APP_PORT=5000 -f Dockerfile.production .

build-local:
	docker build -t react-app-production:local --build-arg CADDYFILE=Caddyfile.local --build-arg REACT_APP_BACKEND_SERVER_IP=localhost --build-arg REACT_APP_PORT=5000 -f Dockerfile.production .

