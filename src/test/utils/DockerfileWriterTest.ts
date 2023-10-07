/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {AfterEach, Arguments, ArgumentsSource, ParameterizedTest, Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import {Dockerfile} from "../../main";
import DockerfileWriter from "../../main/utils/DockerfileWriter";

@TestClass
export default class DockerfileWriterTest {

    private readonly outDir = fs.mkdtempSync(path.join(os.tmpdir(), "dockerfiledir-mock"));

    @ParameterizedTest
    @ArgumentsSource(Array.of(
        new Arguments(null)
    ))
    public doesNotAcceptNullDockerfile(nullDockerfile: Dockerfile): void {
        assert.throws(() => DockerfileWriter.of(nullDockerfile));
    }

    @Test
    public generatesFile(): void {
        const dockerfile =
            Dockerfile.newBuilder()
                .setName("Dockerfile.mock")
                .setOutDir(this.outDir)
                .build();

        DockerfileWriter.of(dockerfile).write();

        const filePath = path.join(dockerfile.directory(), dockerfile.name());

        assert.isTrue(fs.existsSync(filePath));
    }

    @Test
    public throwsException(): void {
        const dockerfile =
            Dockerfile.newBuilder()
                .setName("Dockerfile.mock")
                .setOutDir("/private/temp")
                .build();

        assert.throws(
            () => DockerfileWriter.of(dockerfile).write(),
            "EACCES: permission denied, mkdir"
        );
    }

    @AfterEach
    public tearDown(): void {
        fs.rmSync(this.outDir, {recursive: true});
    }
}
