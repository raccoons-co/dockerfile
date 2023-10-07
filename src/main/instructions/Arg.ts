/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import {AutomaticArg} from "./AutomaticArg";
import {Optional, Strict} from "@raccoons-co/ethics";

/**
 * Represents an {@link https://docs.docker.com/engine/reference/builder/#arg | ARG} instruction.
 */
export default class Arg extends AbstractInstruction implements Committable {

    private constructor(command: string) {
        super("ARG", command);
    }

    /** Returns a new `Arg` instruction of given name and optional default value. */
    public static of(name: string, defaultValue?: string): Arg {
        Strict.notNull(name);
        const maybeDefaultValue = Optional.ofNullable(defaultValue);
        return maybeDefaultValue.isEmpty()
            ? new Arg(name)
            : new Arg(`${name}=${maybeDefaultValue.get()}`);
    }

    /** Returns a new `Arg` instruction of given automatic platform variable name. */
    public static ofAutomatic(name: AutomaticArg): Arg {
        return new Arg(name);
    }
}
