[![npm version](https://badge.fury.io/js/@raccoons-co%2Fdockerfile.svg)](https://badge.fury.io/js/@raccoons-co%2Fdockerfile)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=raccoons-co_cleanway&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=raccoons-co_cleanway)
[![codecov](https://codecov.io/gh/raccoons-co/dockerfile/graph/badge.svg?token=uksCzUBmwv)](https://codecov.io/gh/raccoons-co/dockerfile)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/raccoons-co/dockerfile/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/raccoons-co/dockerfile/tree/main)

The Dockerfile generation API
---

The `Dockerfile` generation API. See the [documentation](https://raccoons-co.github.io/dockerfile/).

~~~
const config = PackageJson.toObject();

const testStage =
    BuildStage.newBuilder()
        .setName("test-in-docker")
        .setFrom(config.docker.image)
        .addLayer(
            User.of(config.docker.user),
            Workdir.of(config.docker.homedir),
            Copy.withChown(".", ".", config.docker.user),
            Run.ofShell(config.scripts.install_dev),
            Run.ofShell(config.scripts.test),
            Run.ofShell(config.scripts.prepack)
        )
        .build();

const microserviceStage =
    BuildStage.newBuilder()
        .setName("microservice")
        .setFrom(config.docker.image)
        .addLayer(
            User.of(config.docker.user),
            Workdir.of(config.docker.homedir),
            Copy.fromStage(testStage, "/home/node/dist/", "dist/"),
            Copy.fromStage(testStage, "/home/node/package.json", "."),
            Env.of("NODE_ENV", "production"),
            Run.ofShell(config.scripts.install_prod),
            Expose.ofTcp(config.docker.port),
            Cmd.ofExec(config.scripts.start)
        )
        .build();

const dockerfile =
    Dockerfile.newBuilder()
        .setName("tind.Dockerfile")
        .addStage(testStage)
        .addStage(microserviceStage)
        .build();

dockerfile.synthesize();
~~~

*projectRoot/generated/docker/tind.Dockerfile*:

~~~Dockerfile
# GENERATED CODE - DO NOT EDIT!
# Initialize a new build stage
FROM node:lts-alpine AS test-in-docker
USER node
WORKDIR /home/node
COPY --chown=node . .
RUN npm install
RUN npm run test:coverage
RUN npm run build
# Initialize a new build stage
FROM node:lts-alpine AS microservice
USER node
WORKDIR /home/node
COPY --from=test-in-docker /home/node/lib/ lib/
COPY --from=test-in-docker /home/node/package.json .
ENV NODE_ENV=production
RUN npm install --omit=dev --omit=optional --ignore-scripts
EXPOSE 80/tcp
CMD ["npm","run","this:microservice"]
# EOF
~~~
