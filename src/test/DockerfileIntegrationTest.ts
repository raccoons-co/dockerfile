/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {BuildStage, Cmd, Copy, Dockerfile, Env, Expose, OnBuild, PackageJson, Run, User, Workdir} from "../main";
import {existsSync} from "node:fs";
import HealthCheck from "../main/instructions/HealthCheck";

@TestClass
export default class DockerfileIntegrationTest {

    @Test
    public synthezesCorrectDockerfile(): void {
        const config = PackageJson.toObject();

        const compileStage =
            BuildStage.newBuilder()
                .setName("microservice-compiler")
                .setFrom(config.docker.image)
                .addLayer(
                    User.of(config.docker.user),
                    Workdir.of(config.docker.homedir),
                    Copy.withChown(".", ".", config.docker.user),
                    Run.ofShell(config.scripts.install_dev),
                    Run.ofShell(config.scripts.prepack)
                )
                .build();

        const microserviceStage =
            BuildStage.newBuilder()
                .setFrom(config.docker.image)
                .addLayer(
                    User.of(config.docker.user),
                    Workdir.of(config.docker.homedir),
                    Copy.fromStage(compileStage, "/home/node/dist/", "dist/"),
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
                .addStage(compileStage)
                .addStage(microserviceStage)
                .build();

        dockerfile.synthesize();

        assert.isTrue(existsSync(dockerfile.path()));
    }

}
