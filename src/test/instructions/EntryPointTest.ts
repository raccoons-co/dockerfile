/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {EntryPoint} from "../../main";

@TestClass
export default class EntryPointTest {

    @Test
    public returnsEntryPointInstruction(): void {
        const instruction = EntryPoint.ofShellForm("/usr/sbin/apache2ctl -D FOREGROUND");
        assert.equal(instruction.toString(), "ENTRYPOINT /usr/sbin/apache2ctl -D FOREGROUND");
    }

    @Test
    public returnsEntryPointOfExecFormInstruction(): void {
        const instruction = EntryPoint.of("/usr/sbin/apache2ctl -D FOREGROUND");
        assert.equal(instruction.toString(), "ENTRYPOINT [\"/usr/sbin/apache2ctl\",\"-D\",\"FOREGROUND\"]");
    }
}
