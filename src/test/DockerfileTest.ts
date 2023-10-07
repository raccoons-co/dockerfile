/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import * as os from "node:os";
import * as path from "node:path";
import {BuildStage, Dockerfile} from "../main";

@TestClass
export default class DockerfileTest {

    @Test
    public setsDockefileName(): void {
        const dockerfile =
            Dockerfile.newBuilder()
                .setName("Dockerfile.mock")
                .build();

        assert.equal(dockerfile.name(), "Dockerfile.mock");
    }

    @Test
    public setsOutDir(): void {
        const outDir = os.tmpdir();
        const dockerfile =
            Dockerfile.newBuilder()
                .setOutDir(outDir)
                .build();

        assert.equal(dockerfile.directory(), outDir);
    }

    @Test
    public returnsDockerfilePath(): void {
        const outDir = os.tmpdir();
        const dockerfile =
            Dockerfile.newBuilder()
                .setOutDir(outDir)
                .build();

        assert.equal(dockerfile.path(), path.join(outDir, "Dockerfile"));
    }

    @Test
    public addsStage(): void {
        const stage =
            BuildStage.newBuilder()
                .setFrom("scratch")
                .build();

        const dockerfile = Dockerfile.newBuilder().addStage(stage).build();

        assert.lengthOf(dockerfile.stages(), 1);
    }
}
