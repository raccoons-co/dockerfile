/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import Committable from "./instructions/Committable";
import BuildStage from "./BuildStage";

/**
 * The builder of a Docker build stage layers.
 */
export default interface BuildStageBuilder {

    /** Adds layer to the build stage. */
    addLayer(...instructions: Array<Committable>): BuildStageBuilder;

    /** Returns new Docker build stage instance. */
    build(): BuildStage;
}
