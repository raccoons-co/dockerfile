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
    "docs": "typedoc ./src/main/index.ts",
    "generate": "ts-node src/test/.indocker/Dockerfile.ts",
    "install_dev": "npm install",
    "install_prod": "npm install --omit=dev --omit=optional --ignore-scripts",
    "lint.packagejson": "npmPkgJsonLint . --ignorePath .npmpackagejsonlintignore",
    "lint.typescript": "eslint './src/**/*.ts'",
    "postgenerate": "docker run --rm -i hadolint/hadolint hadolint --ignore=DL3059 - < ./generated/docker/Dockerfile",
    "posttest": "npm-run-all lint.*",
    "prepack": "npm run compile",
    "pretest.indocker": "npm run generate",
    "start": "npm run this.microservice",
    "test": "nyc ts-node src/test/EntryPoint",
    "test.indocker": "docker buildx build --rm --tag tind --file ./generated/docker/tind.Dockerfile .",
    "this.microservice": "node dist/main/EntryPoint"
  },
  "docker": {
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
        .setName("test-in-docker")
        .setFrom(config.docker.image)
        .addLayer(
            User.of(config.docker.user),
            Workdir.of(config.docker.homedir),
            Copy.withChown(".", ".", config.docker.user),
            Run.ofShell(config.scripts.install_dev),
            Run.ofShell("npm test"),
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
            Copy.fromStage(compileStage, "/home/node/lib/", "lib/"),
            Copy.fromStage(compileStage, "/home/node/package.json", "."),
            Env.of("NODE_ENV", "production"),
            Run.ofShell(config.scripts.install_prod),
            Expose.ofTcp(config.docker.port),
            HealthCheck.of(Cmd.ofShell("wget -q http://localhost/ || exit 1")),
            OnBuild.of(Run.ofShell("exit 1")),
            Cmd.ofExec(config.scripts.start)
        )
        .build();

const dockerfile =
    Dockerfile.newBuilder()
        .setName("tind.Dockerfile")
        .addStage(compileStage)
        .addStage(microserviceStage)
        .build();

dockerfile.synthesize();
~~~

*projectRoot/generated/tind.Dockerfile*:

~~~Dockerfile
# GENERATED CODE - DO NOT EDIT!
# Initialize a new build stage
FROM node:lts-alpine AS test-in-docker
USER node
WORKDIR /home/node
COPY --chown=node . .
RUN npm install
RUN npm test
RUN npm run compile
# Initialize a new build stage
FROM node:lts-alpine AS microservice
USER node
WORKDIR /home/node
COPY --from=test-in-docker /home/node/lib/ lib/
COPY --from=test-in-docker /home/node/package.json .
ENV NODE_ENV=production
RUN npm install --omit=dev --omit=optional --ignore-scripts
EXPOSE 80/tcp
HEALTHCHECK CMD wget -q http://localhost/ || exit 1
ONBUILD RUN exit 1
CMD ["npm","run","this.microservice"]
# EOF
~~~
