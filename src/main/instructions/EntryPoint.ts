/*
 *  Copyright 2023, Raccoons. Developing simple way to change.
 *
 *  @license MIT
 *
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";

/**
 *  Represents a {@link https://docs.docker.com/engine/reference/builder/#entrypoint | ENTRYPOINT} instruction.
 */
export default class EntryPoint extends AbstractInstruction implements Committable {

    private constructor(execFormCommand: string) {
        super("ENTRYPOINT", execFormCommand);
    }

    /** Returns a new `EntryPoint` instruction with shell form of command. */
    public static of(command: string): EntryPoint {
        return new EntryPoint(command);
    }

    /** Returns a new `EntryPoint` instruction with exec form of command. */
    public static ofExecForm(command: string): EntryPoint {
        return new EntryPoint(AbstractInstruction.execForm(command));
    }
}
