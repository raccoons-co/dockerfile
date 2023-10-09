/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Run} from "../../main";

@TestClass
export default class RunTest {

    @Test
    public returnsRunInstruction(): void {
        const instruction = Run.ofShell("npm install --omit=dev --omit=optional --ignore-scripts");
        assert.equal(instruction.toString(), "RUN npm install --omit=dev --omit=optional --ignore-scripts");
    }

    @Test
    public returnsRunOfExecFormInstruction(): void {
        const instruction = Run.ofExec("npm install --omit=dev --omit=optional --ignore-scripts");
        assert.equal(instruction.toString(),
            "RUN [\"npm\",\"install\",\"--omit=dev\",\"--omit=optional\",\"--ignore-scripts\"]");
    }
}
