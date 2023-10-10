/*
 *  Copyright 2023, Raccoons. Developing simple way to change.
 *
 *  @license MIT
 *
 */

import {BuildStage, Cmd, Copy, Dockerfile, Env, Expose, OnBuild, PackageJson, Run, User, Workdir} from "../../main";
import HealthCheck from "../../main/instructions/HealthCheck";

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
            Run.ofShell("npm test")
        )
        .build();

const compileStage =
    BuildStage.newBuilder()
        .setName("compiler")
        .setFrom(config.docker.image)
        .addLayer(
            User.of(config.docker.user),
            Workdir.of(config.docker.homedir),
            Copy.fromStage(testStage, "/home/node/", "."),
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
        .addStage(testStage)
        .addStage(compileStage)
        .addStage(microserviceStage)
        .build();

dockerfile.synthesize();