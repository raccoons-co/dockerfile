/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import {Strict} from "@raccoons-co/ethics";

/**
 * Represents an {@link https://docs.docker.com/engine/reference/builder/#env | ENV} instruction.
 */
export default class Env extends AbstractInstruction implements Committable {

    private constructor(variable: string) {
        super("ENV", variable);
    }

    /** Returns a new Env instruction of given environment variable specified with key and value. */
    public static of(key: string, value: string): Env {
        Strict.notNull(key);
        Strict.notNull(value);
        return new Env(`${key}=${value}`);
    }
}

