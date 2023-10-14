/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import {Optional, Strict} from "@raccoons-co/ethics";
import BuildStage from "../BuildStage";

/**
 * Represents a {@link https://docs.docker.com/engine/reference/builder/#copy | COPY} instruction.
 */
export default class Copy extends AbstractInstruction implements Committable {

    private constructor(instructionAgruments: string) {
        super("COPY", instructionAgruments);
    }

    /** Returns a new `Copy` instruction of given source and destination arguments. */
    public static of(source: string, destination: string): Copy {
        Strict.notNull(source);
        Strict.notNull(destination);
        return new Copy(`${source} ${destination}`);
    }

    /**
     * Returns a new `Copy` instruction of given source and destination arguments with enhanced semantics.
     * {@link https://docs.docker.com/engine/reference/builder/#copy---link}
     */
    public static ofLink(source: string, destination: string): Copy {
        Strict.notNull(source);
        Strict.notNull(destination);
        return new Copy(`--link ${source} ${destination}`);
    }

    /** Returns a new `Copy` instruction of given source and destination arguments from given build stage. */
    public static fromStage(stage: BuildStage, source: string, destination: string): Copy {
        Strict.notNull(stage);
        Strict.notNull(source);
        Strict.notNull(destination);
        return new Copy(`--from=${stage.name()} ${source} ${destination}`);
    }

    /** Returns a new `Copy` instruction of given source, destination, chown arguments and optionally chmod. */
    public static withChown(source: string, destination: string, chown: string, chmod?: string): Copy {
        Strict.notNull(source);
        Strict.notNull(destination);
        Strict.notNull(chown);
        const maybeChmod = Optional.ofNullable(chmod);
        return maybeChmod.isEmpty()
            ? new Copy(`--chown=${chown} ${source} ${destination}`)
            : new Copy(`--chown=${chown} --chmod=${chmod} ${source} ${destination}`);
    }
}
