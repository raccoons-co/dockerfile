/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import DockerfileWriter from "../utils/DockerfileWriter";
import CommentDirective from "./CommentDirective";
import {Optional, Strict} from "@raccoons-co/ethics";

/**
 * Represents a {@link https://docs.docker.com/engine/reference/builder/#from | FROM} instruction.
 */
export default class From extends AbstractInstruction implements Committable {

    private constructor(fromArgs: string) {
        super("FROM", fromArgs);
    }

    /** Returns a new `From` instruction of given image. */
    public static of(image: string, maybeAs: Optional<string>): From {
        Strict.notNull(image);
        Strict.notNull(maybeAs);
        return maybeAs.isEmpty()
            ? new From(image)
            : new From(`${image} AS ${maybeAs.get()}`);
    }

    /** {@inheritDoc} */
    public accept(writer: DockerfileWriter): void {
        Strict.notNull(writer);
        CommentDirective.of("Initialize a new build stage").accept(writer);
        super.accept(writer);
    }
}
