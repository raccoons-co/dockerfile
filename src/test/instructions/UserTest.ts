/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {User} from "../../main";

@TestClass
export default class UserTest {

    @Test
    public returnsUserInstruction(): void {
        const instruction = User.of("node");
        assert.equal(instruction.toString(), "USER node");
    }

    @Test
    public returnsUserGroupInstructionIncluding(): void {
        const instruction = User.of("node", "node_group");
        assert.equal(instruction.toString(), "USER node:node_group");
    }

}
