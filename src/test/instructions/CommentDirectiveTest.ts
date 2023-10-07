/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import CommentDirective from "../../main/instructions/CommentDirective";

@TestClass
export default class CommentDirectiveTest {

    @Test
    public returnsCommentInstruction(): void {
        const instruction = CommentDirective.of("GENERATED CODE - DO NOT EDIT!");
        assert.equal(instruction.toString(), "# GENERATED CODE - DO NOT EDIT!");
    }
}
