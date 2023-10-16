/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Strict} from "@raccoons-co/ethics";
import {URL} from "node:url";
import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";

/**
 * Represents a {@link https://docs.docker.com/engine/reference/builder/#add | ADD} instruction.
 */
export default class Add extends AbstractInstruction implements Committable {

    private constructor(instructionAgruments: string) {
        super("ADD", instructionAgruments);
    }

    /**
     * Returns a new `Add` instruction of given source and destination arguments.
     *
     * @param source - the file, directory or remote file URL
     * @param destination - the path on the filesystem of the image
     */
    public static of(source: string, destination: string): Add {
        Strict.notNull(source);
        Strict.notNull(destination);
        return new Add(`${source} ${destination}`);
    }

    /**
     * Returns a new `Add` instruction of given Git repository.
     * {@link https://docs.docker.com/engine/reference/builder/#adding-a-git-repository-add-git-ref-dir}
     *
     * @param gitReference - the git repository reference
     * @param directory - the path on the filesystem of the image
     */
    public static ofGit(gitReference: string, directory: string): Add {
        Strict.notNull(gitReference);
        Strict.notNull(directory);
        return new Add(`${gitReference} ${directory}`);
    }

    /**
     * Returns a new `Add` instruction of given git repository and add .git directory.
     * {@link https://docs.docker.com/engine/reference/builder/#adding-a-git-repository-add-git-ref-dir}
     *
     * @param gitReference - the git repository reference
     * @param directory - the path on the filesystem of the image
     */
    public static ofGitKeepDir(gitReference: string, directory: string): Add {
        Strict.notNull(gitReference);
        Strict.notNull(directory);
        return new Add(`--keep-git-dir=true ${gitReference} ${directory}`);
    }

    /**
     * Returns a new `Add` instruction with verifying a remote file checksum.
     *
     * @param sourceUrl - the remote file
     * @param destination - the destination into which the source will be copied
     * @param checkSum - the checksum of a remote file
     */
    public static withCheckSum(sourceUrl: URL, destination: string, checkSum: string): Add {
        Strict.notNull(sourceUrl);
        Strict.notNull(destination);
        Strict.notNull(checkSum);
        return new Add(`--checksum=${checkSum} ${sourceUrl} ${destination}`);
    }

    /**
     * Returns a new `Add` instruction of given source, destination, chown arguments and optionally chmod.
     *
     * @param source - the file, directory or remote file URL
     * @param destination - the path on the filesystem of the image
     * @param chown - the username, groupname, or UID/GID to request specific ownership of the content
     * @param chmod - the destination permissions
     */
    public static withChown(source: string, destination: string, chown: string, chmod?: string): Add {
        Strict.notNull(source);
        Strict.notNull(destination);
        Strict.notNull(chown);
        return chmod
            ? new Add(`--chown=${chown} --chmod=${chmod} ${source} ${destination}`)
            : new Add(`--chown=${chown} ${source} ${destination}`);
    }
}
