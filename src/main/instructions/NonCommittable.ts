/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import DockerfileInstruction from "../DockerfileInstruction";

/**
 * A non-committable Dockerfile instruction which does not adds a layer to the build.
 *
 * @internal
 */
export default interface NonCommittable extends DockerfileInstruction {
}
