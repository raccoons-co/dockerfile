/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import DockerfileInstruction from "../DockerfileInstruction";

/**
 * Represents a {@link https://docs.docker.com/engine/reference/builder/#workdir | WORKDIR} instruction.
 */
export default class Workdir extends AbstractInstruction implements Committable {

    private constructor(path: string) {
        super("WORKDIR", path);
    }

    /** Returns a new `Workdir` instruction of given path. */
    public static of(path: string): DockerfileInstruction {
        return new Workdir(path);
    }
}
