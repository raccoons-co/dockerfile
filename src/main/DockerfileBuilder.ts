/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import BuildStage from "./BuildStage";
import Dockerfile from "./Dockerfile";

export default interface DockerfileBuilder {

    /** Sets the Dockerfile name. */
    setName(name: string): this

    /** Sets the Dockerfile output directory. */
    setOutDir(path: string): this

    /** Adds the build stage. */
    addStage(stage: BuildStage): this;

    /** Returns a new instance of the `Dockerfile`. */
    build(): Dockerfile;
}
