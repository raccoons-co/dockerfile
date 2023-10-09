[![npm version](https://badge.fury.io/js/@raccoons-co%2Fdockerfile.svg)](https://badge.fury.io/js/@raccoons-co%2Fdockerfile)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=raccoons-co_cleanway&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=raccoons-co_cleanway)
[![codecov](https://codecov.io/gh/raccoons-co/dockerfile/graph/badge.svg?token=uksCzUBmwv)](https://codecov.io/gh/raccoons-co/dockerfile)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/raccoons-co/dockerfile/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/raccoons-co/dockerfile/tree/main)

The Dockerfile generation API
---

The `Dockerfile` generation API. See the [documentation](https://raccoons-co.github.io/dockerfile/).

*package.json*:

~~~
  "scripts": {
    "compile": "tsc",
    "generate": "ts-node src/build/Dockerfile.ts",
    "install_dev": "npm install",
    "install_prod": "npm install --omit=dev --omit=optional --ignore-scripts",
    "prepack": "npm run compile",
    "start": "npm run this.microservice",
    "this.microservice": "node dist/main/EntryPoint"
  },
  "microservice": {
    "image": "node:lts-alpine",
    "user": "node",
    "homedir": "/home/node",
    "port": 80
  }
~~~

API usage:

~~~
const config = PackageJson.toObject();

const compileStage =
    BuildStage.newBuilder()
        .setName("microservice-compiler")
        .setFrom(config.microservice.image)
        .addLayer(
            User.of(config.microservice.user),
            Workdir.of(config.microservice.homedir),
            Copy.withChown(".", ".", config.microservice.user),
            Run.of(config.scripts.install_dev),
            Run.of(config.scripts.prepack)
        )
        .build();

const microserviceStage =
    BuildStage.newBuilder()
        .setFrom(config.microservice.image)
        .addLayer(
            User.of(config.microservice.user),
            Workdir.of(config.microservice.homedir),
            Copy.fromStage(compileStage, "/home/node/dist/", "dist/"),
            Copy.fromStage(compileStage, "/home/node/package.json", "."),
            Env.of("NODE_ENV", "production"),
            Run.of(config.scripts.install_prod),
            Expose.ofTcp(config.microservice.port),
            HealthCheck.of(Cmd.of("wget -q http://localhost/ || exit 1")),
            Cmd.of(config.scripts.start)
        )
        .build();

const dockerfile =
    Dockerfile.newBuilder()
        .addStage(compileStage)
        .addStage(microserviceStage)
        .build();

dockerfile.synthesize();
~~~

*projectRoot/generated/Dockerfile*:

~~~Dockerfile
# GENERATED CODE - DO NOT EDIT!
# Initialize a new build stage
FROM node:lts-alpine AS microservice-compiler
USER node
WORKDIR /home/node
COPY --chown=node . .
RUN npm install
RUN npm run compile
# Initialize a new build stage
FROM node:lts-alpine
USER node
WORKDIR /home/node
COPY --from=microservice-compiler /home/node/dist/ dist/
COPY --from=microservice-compiler /home/node/package.json .
ENV NODE_ENV=production
RUN npm install --omit=dev --omit=optional --ignore-scripts
EXPOSE 80/tcp
HEALTHCHECK CMD wget -q http://localhost/ || exit 1
CMD npm run this.microservice
# EOF
~~~
