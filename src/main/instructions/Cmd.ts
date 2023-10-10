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

    /** Returns a new `Cmd` instruction with exec form of given command. */
    public static ofExec(command: string): Cmd {
        return new Cmd(AbstractInstruction.execForm(command));
    }

    /** Returns a new `Cmd` instruction with shell form of given command. */
    public static ofShell(command: string): Cmd {
        return new Cmd(command);
    }
}
