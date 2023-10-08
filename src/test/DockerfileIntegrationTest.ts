/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {BuildStage, Cmd, Copy, Dockerfile, Env, Expose, PackageJson, Run, User, Workdir} from "../main";
import {existsSync} from "node:fs";
import HealthCheck from "../main/instructions/HealthCheck";

@TestClass
export default class DockerfileIntegrationTest {

    @Test
    public synthezesCorrectDockerfile(): void {
        const packageJson = PackageJson.toObject();

        const compileStage =
            BuildStage.newBuilder()
                .setName("microservice-compiler")
                .setFrom(packageJson.microservice.image)
                .addLayer(
                    User.of(packageJson.microservice.user),
                    Workdir.of(packageJson.microservice.homedir),
                    Copy.withChown(".", ".", packageJson.microservice.user),
                    Run.of(packageJson.scripts.install_dev),
                    Run.of(packageJson.scripts.prepack)
                )
                .build();

        const microserviceStage =
            BuildStage.newBuilder()
                .setFrom(packageJson.microservice.image)
                .addLayer(
                    User.of(packageJson.microservice.user),
                    Workdir.of(packageJson.microservice.homedir),
                    Copy.fromStage(compileStage, "/home/node/dist/", "dist/"),
                    Copy.fromStage(compileStage, "/home/node/package.json", "."),
                    Env.of("NODE_ENV", "production"),
                    Run.of(packageJson.scripts.install_prod),
                    Expose.ofTcp(packageJson.microservice.port),
                    HealthCheck.of(Cmd.of("wget -q http://localhost/ || exit 1")),
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
