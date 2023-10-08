/*
 *  Copyright 2023, Raccoons. Developing simple way to change.
 *
 *  @license MIT
 *
 */

import {Strict} from "@raccoons-co/ethics";
import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";

/**
 *  Represents a {@link https://docs.docker.com/engine/reference/builder/#onbuild | ONBUILD} instruction.
 */
export default class OnBuild extends AbstractInstruction implements Committable {

    private constructor(instruction: string) {
        super("ONBUILD", instruction);
    }

    /** Returns a new `OnBuild` instruction of given instruction. */
    public static of(instruction: Committable): OnBuild {
        Strict.notNull(instruction);
        return new OnBuild(instruction.toString());
    }

}
