/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import BuildStageBuilder from "./BuildStageBuilder";

/**
 * An initialisation interface of the Docker build stage builder.
 */
export default interface InitBuildStageBuilder {

    /** Sets the build stage name. */
    setName(name: string): InitBuildStageBuilder;

    /** Sets the image for subsequent instructions.  */
    setFrom(image: string): BuildStageBuilder;
}
