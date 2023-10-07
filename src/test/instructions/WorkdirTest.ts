/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Workdir} from "../../main";

@TestClass
export default class WorkdirTest {

    @Test
    public returnsWorkdirInstruction(): void {
        const instruction = Workdir.of("/home/node");
        assert.equal(instruction.toString(), "WORKDIR /home/node");
    }
}
