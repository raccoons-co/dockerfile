/*
 *  Copyright 2023, Raccoons. Developing simple way to change.
 *
 *  @license MIT
 *
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";

/**
 *  Represents a {@link https://docs.docker.com/engine/reference/builder/#volume | VOLUME} instruction.
 */
export default class Volume extends AbstractInstruction implements Committable {

    private constructor(data: string) {
        super("VOLUME", data);
    }

    /** Returns a new `Volume` instruction of given data. */
    public static of(data: string): Volume {
        return new Volume(data);
    }

}
