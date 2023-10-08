/*
 *  Copyright 2023, Raccoons. Developing simple way to change.
 *
 *  @license MIT
 *
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import {Strict} from "@raccoons-co/ethics";

export default class OnBuild extends AbstractInstruction implements Committable {

    private constructor(instruction: string) {
        super("ONBUILD", instruction);
    }

    /** Returns a new `OnBuild` instruction of given arguments. */
    public static of(instruction: Committable): OnBuild {
        Strict.notNull(instruction);
        return new OnBuild(instruction.toString());
    }

}
