/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";

/**
 * Represents a {@link https://docs.docker.com/engine/reference/builder/#cmd | CMD} instruction.
 */
export default class Cmd extends AbstractInstruction implements Committable {

    private constructor(command: string) {
        super("CMD", command);
    }

    /** Returns a new `Cmd` instruction of given command. */
    public static of(command: string): Cmd {
        return new Cmd(command);
    }
}
