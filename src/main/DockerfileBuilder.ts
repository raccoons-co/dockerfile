/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import BuildStage from "./BuildStage";
import Dockerfile from "./Dockerfile";

export default interface DockerfileBuilder {

    /** Sets Dockerfile name. */
    setName(name: string): this

    /** Sets Dockerfile output directory. */
    setOutDir(path: string): this

    /** Adds build BuildStage. */
    addStage(stage: BuildStage): this;

    /** Returns new `Dockerfile` instance. */
    build(): Dockerfile;
}
