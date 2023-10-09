/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {OnBuild, Run} from "../../main";

@TestClass
export default class OnBuildTest {

    @Test
    public returnsOnBuildInstruction(): void {
        const instruction = OnBuild.of(Run.ofShell("npm install"));
        assert.equal(instruction.toString(), "ONBUILD RUN npm install");
    }
}
