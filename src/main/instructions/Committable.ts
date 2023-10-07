/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import DockerfileInstruction from "./DockerfileInstruction";

/**
 * A committable Dockerfile instruction which adds a layer to the build.
 */
export default interface Committable extends DockerfileInstruction {
}
