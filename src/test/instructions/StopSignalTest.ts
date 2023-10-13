/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Signal, StopSignal} from "../../main";

@TestClass
export default class StopSignalTest {

    @Test
    public returnsVolumeInstruction(): void {
        const instruction = StopSignal.of(Signal.SIGINT);
        assert.equal(instruction.toString(), "STOPSIGNAL SIGINT");
    }
}
