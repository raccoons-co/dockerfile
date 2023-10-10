/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";

/**
 * Represents a {@link https://docs.docker.com/engine/reference/builder/#shell | SHELL} instruction.
 */
export default class Shell extends AbstractInstruction implements Committable {

    private constructor(command: string) {
        super("SHELL", command);
    }

    /** Returns a new `Run` instruction with exec form of given command. */
    public static of(command: string): Shell {
        return new Shell(AbstractInstruction.execForm(command));
    }
}
