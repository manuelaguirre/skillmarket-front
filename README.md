# Skill Market Frontend

This repository contains the code for the frontend of [skillmarket.uk](https://skillmarket.uk). This is a [VueJS](https://vuejs.org)
application that uses [Tailwind CSS](https://tailwindcss.com/).

This application uses the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial),
so you will need an API key to use it.

You can find the corresponding backend application in [this GitHub repo](https://github.com/julianmateu/skillmarket-backend).

This project was submitted to the [Redis 'Beyond Cache' Hackathon](https://redisbeyondcache2020.devpost.com), you can see
the submission and vote for it [here](https://devpost.com/software/skill-market-t5cova).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Local development

To develop locally, you can use Skaffold to build the Docker image and deplooy to a Kubernetes cluster (minikube).

### Requirements
* [Docker](https://www.docker.com/)
* [Minikube](https://minikube.sigs.k8s.io/docs/start/)
* [Skaffold](https://skaffold.dev/)

Start the minikube node:
```bash
minikube start
```

Update the value of the `VUE_APP_API_URL` env variable with the URL for the backend in the [k8s deployment config](./k8s/deploy.yml). If the backend runs locally with skaffold too, just change the port to the output of `minikube service skillmarket-backend-node-port`

### Run in dev mode with Skaffold
In one terminal run skaffold in dev mode, which will run a dev server which refreshes on code change.
```bash
skaffold dev
```

To access the server locally, just forward the service port locally with minikube:
```bash
minikube service skillmarket-front-node-port
```

## Deployment

You will need to define the following Environment variables:
```bash
VUE_APP_API_KEY="your-google-maps-key"
VUE_APP_API_URL="your-backend-url"
```
