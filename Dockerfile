FROM node:13-alpine

WORKDIR /app

RUN apk add git

COPY package.json package-lock.json ./

RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY .eslintignore *.js ./

RUN npm run build -- --mode development

EXPOSE 8080

CMD npm run serve
