/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {BuildStage, Cmd, Copy, Dockerfile, Env, Expose, PackageJson, Run, User, Workdir} from "../main";
import {existsSync} from "node:fs";
import Label from "../main/instructions/Label";

@TestClass
export default class DockerfileIntegrationTest {

    @Test
    public synthezesCorrectDockerfile(): void {

        const packageJson = PackageJson.toObject();

        const compileStage =
            BuildStage.newBuilder()
                .setName("microservice-compiler")
                .setFrom(packageJson.docker.image)
                .addLayer(
                    User.of(packageJson.docker.user),
                    Workdir.of(packageJson.docker.homedir),
                    Copy.ofChown(".", ".", packageJson.docker.user),
                    Run.of(packageJson.scripts.install_dev),
                    Run.of(packageJson.scripts.prepack)
                )
                .build();

        const microserviceStage =
            BuildStage.newBuilder()
                .setName("microservice")
                .setFrom(packageJson.docker.image)
                .addLayer(
                    User.of(packageJson.docker.user),
                    Workdir.of(packageJson.docker.homedir),
                    Copy.ofFrom(compileStage.name(), "/home/node/lib/", "lib/"),
                    Copy.ofFrom(compileStage.name(), "/home/node/package.json", "."),
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

        assert.isTrue(existsSync(dockerfile.path()));
    }

}
