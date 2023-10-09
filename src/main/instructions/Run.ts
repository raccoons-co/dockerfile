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

    /** Returns a new `Run` instruction with exec form of given command. */
    public static ofExec(command: string): Run {
        return new Run(AbstractInstruction.execForm(command));
    }

    /** Returns a new `Run` instruction with shell form of given command. */
    public static ofShell(command: string): Run {
        return new Run(command);
    }
}
