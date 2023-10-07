/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Strict} from "@raccoons-co/ethics";
import DockerfileWriter from "../utils/DockerfileWriter";

/**
 * The abstraction of a Dockerfile instruction.
 */
export default abstract class AbstractInstruction {

    private readonly instructionKeyword: string;

    private readonly instructionArguments: string;

    protected constructor(instructionKeyword: string, instructionArguments: string) {
        this.instructionKeyword = Strict.notNull(instructionKeyword);
        this.instructionArguments = Strict.notNull(instructionArguments);
    }

    /** Returns the string representation for this instruction. */
    public toString(): string {
        return `${this.instructionKeyword} ${this.instructionArguments}`;
    }

    /**
     * Adds the string representation of this instruction to `DockerfileWriter`
     *
     * @internal
     */
    public accept(writer: DockerfileWriter): void {
        Strict.notNull(writer);
        writer.addRow(this.toString());
    }
}
