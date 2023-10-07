/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Copy} from "../../main";
import BuildStage from "../../main/BuildStage";

@TestClass
export default class CopyTest {

    @Test
    public returnsCopyInstruction(): void {
        const instruction = Copy.of("lib/test/given/", "./lib/test/given/");
        assert.equal(instruction.toString(), "COPY lib/test/given/ ./lib/test/given/");
    }

    @Test
    public returnsCopyLinkInstruction(): void {
        const instruction = Copy.ofLink("lib/test/given/", "./lib/test/given/");
        assert.equal(instruction.toString(), "COPY --link lib/test/given/ ./lib/test/given/");
    }

    @Test
    public returnsCopyFromInstruction(): void {
        const stage = BuildStage.newBuilder().setName("builder").setFrom("scratch").build();
        const instruction = Copy.fromStage(stage, "lib/test/given/", "./lib/test/given/");
        assert.equal(instruction.toString(), "COPY --from=builder lib/test/given/ ./lib/test/given/");
    }

    @Test
    public returnsCopyChownInstruction(): void {
        const instruction = Copy.withChown("lib/test/given/", "./lib/test/given/", "node");
        assert.equal(instruction.toString(), "COPY --chown=node lib/test/given/ ./lib/test/given/");
    }

    @Test
    public returnsCopyChownChmodInstruction(): void {
        const instruction = Copy.withChown("lib/test/given/", "./lib/test/given/", "node:node", "644");
        assert.equal(instruction.toString(), "COPY --chown=node:node --chmod=644 lib/test/given/ ./lib/test/given/");
    }

}
