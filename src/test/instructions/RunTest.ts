/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {PackageJson, Run} from "../../main";

@TestClass
export default class RunTest {

    @Test
    public returnsRunInstruction(): void {
        const packageJson = PackageJson.toObject();
        const instruction = Run.of("npm install --omit=dev --omit=optional --ignore-scripts");
        assert.equal(instruction.toString(), "RUN npm install --omit=dev --omit=optional --ignore-scripts");
    }
}
