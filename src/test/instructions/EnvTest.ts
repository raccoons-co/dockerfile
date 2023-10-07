/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Env} from "../../main";

@TestClass
export default class EnvTest {

    @Test
    public returnsEnvInstruction(): void {
        const instruction = Env.of("NODE_ENV", "development");
        assert.equal(instruction.toString(), "ENV NODE_ENV=development");
    }
}
