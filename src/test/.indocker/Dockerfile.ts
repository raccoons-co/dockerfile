/*
 *  Copyright 2023, Raccoons. Developing simple way to change.
 *
 *  @license MIT
 *
 */

import {BuildStage, Cmd, Copy, Dockerfile, Env, Expose, PackageJson, Run, User, Workdir} from "../../main";

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
            Copy.fromStage(testStage, "/home/node/lib/", "lib/"),
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
