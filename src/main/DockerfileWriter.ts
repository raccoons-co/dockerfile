/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Strict} from "@raccoons-co/ethics";
import * as fs from "fs";
import Dockerfile from "./Dockerfile";

/**
 * The file writer utility.
 *
 * @internal
 */
export default class DockerfileWriter {

    private readonly dockerfile: Dockerfile;

    private readonly fileContent: Array<string>;

    private constructor(dockerfile: Dockerfile) {
        this.dockerfile = Strict.notNull(dockerfile);
        this.fileContent = [];
    }

    /** Returns a new instance of the DockerfileWriter of given Dockerfile. */
    public static of(dockerfile: Dockerfile): DockerfileWriter {
        return new DockerfileWriter(dockerfile);
    }

    /** Adds a row string to the file content. */
    public addRow(row: string): void {
        Strict.notNull(row);
        this.fileContent.push(row);
    }

    /** Writes given content to the file on the filesystem. */
    public write(): void {
        this.ensureMkdir(this.dockerfile.directory());
        const composedFile = this.fileContent.join("\n");
        fs.writeFileSync(this.dockerfile.path(), composedFile);
    }

    private ensureMkdir(path: string): void {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
    }
}
