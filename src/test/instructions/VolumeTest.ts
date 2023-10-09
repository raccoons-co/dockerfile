/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Volume} from "../../main";

@TestClass
export default class VolumeTest {

    @Test
    public returnsVolumeInstruction(): void {
        const instruction = Volume.of("/myvol");
        assert.equal(instruction.toString(), "VOLUME /myvol");
    }
}
