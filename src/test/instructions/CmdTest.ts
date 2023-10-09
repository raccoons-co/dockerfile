/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Cmd} from "../../main";

@TestClass
export default class CmdTest {

    @Test
    public returnsCmdInstruction(): void {
        const instruction = Cmd.of("npm run this.microservice");
        assert.equal(instruction.toString(), "CMD npm run this.microservice");
    }

    @Test
    public returnsCmdWithExecFormInstruction(): void {
        const instruction = Cmd.ofExecForm("npm run this.microservice");
        assert.equal(instruction.toString(), "CMD [\"npm\",\"run\",\"this.microservice\"]");
    }
}
