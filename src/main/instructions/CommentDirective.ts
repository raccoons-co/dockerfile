/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import NonCommittable from "./NonCommittable";

/**
 * Represents a {@link https://docs.docker.com/engine/reference/builder/#cmd | CMD} instruction.
 *
 * @internal
 */
export default class CommentDirective extends AbstractInstruction implements NonCommittable {

    private constructor(value: string) {
        super("#", value);
    }

    /** Returns a new Comment instruction of given string. */
    public static of(value: string): CommentDirective {
        return new CommentDirective(value);
    }
}
