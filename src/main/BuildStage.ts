/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Optional, Strict} from "@raccoons-co/ethics";
import DockerfileInstruction from "./DockerfileInstruction";
import BuildStageBuilder from "./BuildStageBuilder";
import InitBuildStageBuilder from "./InitBuildStageBuilder";
import Committable from "./instructions/Committable";
import From from "./instructions/From";

/**
 * A Docker build stage.
 */
export default class BuildStage {

    private readonly maybeName: Optional<string>;

    private readonly stageInstructions: ReadonlyArray<DockerfileInstruction>;

    private constructor(instructions: ReadonlyArray<DockerfileInstruction>, maybeName: Optional<string>) {
        this.stageInstructions = instructions;
        this.maybeName = maybeName;
    }

    /** Returns a new instance of the Docker `BuildStageBuilder`. */
    public static newBuilder(): InitBuildStageBuilder {
        return new class implements InitBuildStageBuilder, BuildStageBuilder {

            /** Optional build stage name. */
            private maybeName: Optional<string> = Optional.empty();

            /** Build stage image. */
            private image: string = "scratch";

            /** Build stage instructions. */
            private readonly instructions: Array<Committable> = [];

            /** {@inheritDoc} */
            public setName(name: string): InitBuildStageBuilder {
                this.maybeName = Optional.of(name);
                return this;
            }

            /** {@inheritDoc} */
            public setFrom(image: string): BuildStageBuilder {
                this.image = Strict.notNull(image);
                return this;
            }

            /** {@inheritDoc} */
            public addLayer(...instructions: Array<Committable>): BuildStageBuilder {
                Strict.notNull(instructions);
                this.instructions.push(...instructions);
                return this;
            }

            /** {@inheritDoc} */
            build(): BuildStage {
                const instructions =
                    Array.of(
                        From.of(this.image, this.maybeName),
                        ...this.instructions
                    );
                return new BuildStage(instructions, this.maybeName);
            }
        };
    }

    /** Returns the build stage name. */
    public name(): string {
        return this.maybeName.orElseThrow();
    }

    /** Returns all Dockerfile instructions for this build stage. */
    public instructions(): ReadonlyArray<DockerfileInstruction> {
        return this.stageInstructions;
    }
}
