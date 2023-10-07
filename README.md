[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=raccoons-co_cleanway&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=raccoons-co_cleanway)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/raccoons-co/cleanway-skeleton/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/raccoons-co/cleanway-skeleton/tree/main)

The Dockerfile generation API
---

*package.json*:

~~~
  "scripts": {
    "install_dev": "npm install",
    "install_prod": "npm install --omit=dev --omit=optional --ignore-scripts",
    "prepack": "npm run build",
    "start": "npm run this.microservice",
    "this.microservice": "node dist/main/EntryPoint"
  },
  "docker": {
    "image": "node:lts-alpine",
    "user": "node",
    "homedir": "/home/node",
    "port": 80
  }
~~~

API usage example:

~~~
const packageJson = PackageJson.toObject();

const compileStage =
    BuildStage.newBuilder()
        .setName("microservice-compiler")
        .setFrom(packageJson.docker.image)
        .addLayer(
            User.of(packageJson.docker.user),
            Workdir.of(packageJson.docker.homedir),
            Copy.withChown(".", ".", packageJson.docker.user),
            Run.of(packageJson.scripts.install_dev),
            Run.of(packageJson.scripts.prepack)
        )
        .build();

const microserviceStage =
    BuildStage.newBuilder()
        .setFrom(packageJson.docker.image)
        .addLayer(
            User.of(packageJson.docker.user),
            Workdir.of(packageJson.docker.homedir),
            Copy.fromStage(compileStage, "/home/node/dist/", "dist/"),
            Copy.fromStage(compileStage, "/home/node/package.json", "."),
            Env.of("NODE_ENV", "production"),
            Run.of(packageJson.scripts.install_prod),
            Expose.ofTcp(packageJson.docker.port),
            Cmd.of(packageJson.scripts.start)
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
RUN npm run build
# Initialize a new build stage
FROM node:lts-alpine
USER node
WORKDIR /home/node
COPY --from=microservice-compiler /home/node/dist/ dist/
COPY --from=microservice-compiler /home/node/package.json .
ENV NODE_ENV=production
RUN npm install --omit=dev --omit=optional --ignore-scripts
EXPOSE 80/tcp
CMD npm run this.microservice
# EOF
~~~
