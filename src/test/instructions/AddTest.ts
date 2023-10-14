/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {URL} from "node:url";
import {Add} from "../../main";

@TestClass
export default class AddTest {

    @Test
    public returnsAddInstruction(): void {
        const instruction = Add.of("hom*", "/mydir/");
        assert.equal(instruction.toString(), "ADD hom* /mydir/");
    }

    @Test
    public returnsAddGitInstruction(): void {
        const instruction = Add.ofGit("https://github.com/moby/buildkit.git#v0.10.1", "/buildkit");
        assert.equal(instruction.toString(), "ADD https://github.com/moby/buildkit.git#v0.10.1 /buildkit");
    }

    @Test
    public returnsAddGitKeepDirInstruction(): void {
        const instruction = Add.ofGitKeepDir("https://github.com/moby/buildkit.git#v0.10.1", "/buildkit");
        assert.equal(instruction.toString(),
            "ADD --keep-git-dir=true https://github.com/moby/buildkit.git#v0.10.1 /buildkit");
    }

    @Test
    public returnsAddCheckSumInstruction(): void {
        const checkSum = "sha256:24454f830cdb571e2c...";
        const sourceUrl = new URL("https://mock.kernel.org/linux-0.01.tar.gz");
        const instruction = Add.withCheckSum(sourceUrl, "/", checkSum);
        assert.equal(instruction.toString(),
            "ADD --checksum=sha256:24454f830cdb571e2c... https://mock.kernel.org/linux-0.01.tar.gz /");
    }

    @Test
    public returnsCopyChownInstruction(): void {
        const instruction = Add.withChown("files*", "/somedir/", "55:mygroup");
        assert.equal(instruction.toString(), "ADD --chown=55:mygroup files* /somedir/");
    }

    @Test
    public returnsCopyChownChmodInstruction(): void {
        const instruction = Add.withChown("files*", "/somedir/", "myuser:mygroup", "655");
        assert.equal(instruction.toString(), "ADD --chown=myuser:mygroup --chmod=655 files* /somedir/");
    }
}
