/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import {Strict} from "@raccoons-co/ethics";

/**
 * Represents a {@link https://docs.docker.com/engine/reference/builder/#label | LABEL} instruction.
 */
export default class Label extends AbstractInstruction implements Committable {

    private constructor(metadata: string) {
        super("LABEL", metadata);
    }

    /** Returns a new `Label` instruction of given metadata. */
    public static ofMetadata(key: string, value: string): Label {
        Strict.notNull(key);
        Strict.notNull(value);
        return new Label(`${key}="${value}"`);
    }
}
