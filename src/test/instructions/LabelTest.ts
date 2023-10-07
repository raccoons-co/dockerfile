/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Label} from "../../main";

@TestClass
export default class LabelTest {

    @Test
    public returnsLabelInstruction(): void {
        const instruction = Label.ofMetadata("org.label-schema.build-date=", "2023-09-26T18:34:41Z");
        assert.equal(instruction.toString(), "LABEL org.label-schema.build-date==\"2023-09-26T18:34:41Z\"");
    }
}
