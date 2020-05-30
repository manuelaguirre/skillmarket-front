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

## Deployment

You will need to define the following Environment variables:
```bash
VUE_APP_API_KEY="your-google-maps-key"
VUE_APP_API_URL="your-backend-url"
```
