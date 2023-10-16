/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import DockerfileWriter from "./DockerfileWriter";

/**
 * Represents a Dockerfile instruction.
 */
export default interface DockerfileInstruction {

    /**
     * Accepts DockerfileWriter for adding the instruction to the file content.
     *
     * @internal
     */
    accept(writer: DockerfileWriter): void;
}
