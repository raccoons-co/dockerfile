/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Strict} from "@raccoons-co/ethics";
import * as fs from "fs";
import * as path from "path";
import {Dockerfile} from "../index";

/**
 * The file writer utility.
 *
 * @internal
 */
export default class DockerfileWriter {

    /** The directory name for file writing. */
    private readonly directoryName: string;

    /** The file name of generated file. */
    private readonly fileName: string;

    /** The file content to write. */
    private readonly fileContent: Array<string>;

    private constructor(directoryName: string, fileName: string) {
        this.directoryName = Strict.notNull(directoryName);
        this.fileName = Strict.notNull(fileName);
        this.fileContent = [];
    }

    /** Returns a new instance of the DockerfileWriter of given Dockerfile. */
    public static of(dockerfile: Dockerfile): DockerfileWriter {
        Strict.notNull(dockerfile);
        return new DockerfileWriter(dockerfile.directory(), dockerfile.name());
    }

    /** Adds a row string to the file content. */
    public addRow(row: string): void {
        Strict.notNull(row);
        this.fileContent.push(row);
    }

    /** Writes given content to the file on the filesystem. */
    public write(): void {
        this.ensureMkdir(this.directoryName);
        const composedFile = this.fileContent.join("\n");
        fs.writeFileSync(this.fullName(), composedFile);
    }

    private fullName(): string {
        return path.join(this.directoryName, this.fileName);
    }

    private ensureMkdir(path: string): void {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
    }
}
