/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";

/**
 * Represents a {@link https://docs.docker.com/engine/reference/builder/#run | RUN} instruction.
 */
export default class Run extends AbstractInstruction implements Committable {

    private constructor(command: string) {
        super("RUN", command);
    }

    /** Returns a new Copy instruction of given arguments. */
    public static of(command: string): Run {
        return new Run(command);
    }
}
