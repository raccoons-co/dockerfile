/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import Shell from "../../main/instructions/Shell";

@TestClass
export default class ShellTest {

    @Test
    public returnsShellOfExecFormInstruction(): void {
        const instruction = Shell.of("/bin/sh -c");
        assert.equal(instruction.toString(), "SHELL [\"/bin/sh\",\"-c\"]");
    }
}
