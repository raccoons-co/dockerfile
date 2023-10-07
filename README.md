[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=raccoons-co_cleanway&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=raccoons-co_cleanway)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/raccoons-co/cleanway-skeleton/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/raccoons-co/cleanway-skeleton/tree/main)

The Dockerfile generation API
---

~~~Dockerfile
# GENERATED CODE - DO NOT EDIT!
# Initialize a new build stage
FROM node:current-alpine AS microservice
LABEL org.label-schema.build-date="2023-10-07T10:43:06.397Z"
ENV NODE_ENV=production
USER node
WORKDIR /home/node
COPY --chown=node ./dist/ ./dist/
COPY --chown=node package.json .
RUN npm install --omit=dev --omit=optional --ignore-scripts
EXPOSE 80/tcp
CMD npm run this.microservice
# EOF
~~~
