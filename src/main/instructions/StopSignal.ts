/*
 *  Copyright 2023, Raccoons. Developing simple way to change.
 *
 *  @license MIT
 *
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import {Signal} from "./Signal";

/**
 *  Represents a {@link https://docs.docker.com/engine/reference/builder/#stopsignal | STOPSIGNAL} instruction.
 */
export default class StopSignal extends AbstractInstruction implements Committable {

    private constructor(signal: Signal) {
        super("STOPSIGNAL", signal);
    }

    /** Returns a new `StopSignal` instruction of given signal. */
    public static of(signal: Signal): StopSignal {
        return new StopSignal(signal);
    }
}
