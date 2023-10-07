/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Strict} from "@raccoons-co/ethics";
import * as path from "path";
import BuildStage from "./BuildStage";
import DockerfileInstruction from "./instructions/DockerfileInstruction";
import CommentDirective from "./instructions/CommentDirective";
import DockerfileWriter from "./utils/DockerfileWriter";
import DockerfileBuilder from "./DockerfileBuilder";

/**
 * Represents a Dockerfile that can be synthesized into a file on the filesystem.
 */
export default class Dockerfile {

    /** The Dockerfile name to generate. */
    private readonly dockerfileName: string;

    /** The directory name for the generated Dockerfile. */
    private readonly dockerfileDirectory: string;

    /** The build stages. */
    private readonly buildStages: ReadonlyArray<BuildStage>;

    private constructor(dockerfileName: string, dockerfileDirectory: string, buildStages: ReadonlyArray<BuildStage>) {
        this.dockerfileName = dockerfileName;
        this.dockerfileDirectory = dockerfileDirectory;
        this.buildStages = buildStages;
    }

    /** Returns a new instance of the Dockerfile builder. */
    public static newBuilder(): DockerfileBuilder {
        return new class implements DockerfileBuilder {

            private readonly projectRoot = Strict.notNull(process.env.INIT_CWD, "INIT_CWD is undefined");

            private dockerfileName: string = "Dockerfile";

            private dockerfileDirectory: string = path.join(this.projectRoot, "generated", "docker");

            private buildStages: Array<BuildStage> = [];

            /** {@inheritDoc} */
            public setName(name: string): this {
                Strict.notNull(name);
                this.dockerfileName = name;
                return this;
            }

            /** {@inheritDoc} */
            public setOutDir(path: string): this {
                Strict.notNull(path);
                this.dockerfileDirectory = path;
                return this;
            }

            /** {@inheritDoc} */
            public addStage(stage: BuildStage): this {
                Strict.notNull(stage);
                this.buildStages.push(stage);
                return this;
            }

            /** {@inheritDoc} */
            build(): Dockerfile {
                return new Dockerfile(this.dockerfileName, this.dockerfileDirectory, this.buildStages);
            }
        };
    }

    /** Returns Dockerfile name. */
    public name(): string {
        return this.dockerfileName;
    }

    /** Returns Dockerfile directory. */
    public directory(): string {
        return this.dockerfileDirectory;
    }

    /** Returns Dockerfile path. */
    public path(): string {
        return path.join(this.dockerfileDirectory, this.dockerfileName);
    }

    public stages(): ReadonlyArray<BuildStage> {
        return this.buildStages;
    }

    /** Synthesizes a Dockerfile to the filesystem. */
    public synthesize(): void {
        const writer = DockerfileWriter.of(this);

        this.instructions()
            .forEach((instruction) => instruction.accept(writer));

        writer.write();
    }

    /** Returns all instructions from all build stages with added first-line and last-line comments. */
    private instructions(): ReadonlyArray<DockerfileInstruction> {
        const dockerfileInstructions: Array<DockerfileInstruction> = [];

        const firstLine = CommentDirective.of("GENERATED CODE - DO NOT EDIT!");
        dockerfileInstructions.push(firstLine);

        this.buildStages
            .forEach((stage) => dockerfileInstructions.push(...stage.instructions()));

        const lastLine = CommentDirective.of("EOF");
        dockerfileInstructions.push(lastLine);

        return dockerfileInstructions;
    }
}
