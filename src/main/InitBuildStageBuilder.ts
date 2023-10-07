/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import BuildStageBuilder from "./BuildStageBuilder";

/**
 * The builder of a new Docker build stage initialisation.
 */
export default interface InitBuildStageBuilder {

    /** Sets build stage name. */
    setName(name: string): InitBuildStageBuilder;

    /** Sets the image for subsequent instructions.  */
    setFrom(image: string): BuildStageBuilder;
}
