/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import DockerfileWriter from "../utils/DockerfileWriter";

/**
 * Represents Dockerfile instruction.
 */
export default interface DockerfileInstruction {

    /** Accepts DockerfileWriter for adding the instruction to the file content. */
    accept(writer: DockerfileWriter): void;
}
