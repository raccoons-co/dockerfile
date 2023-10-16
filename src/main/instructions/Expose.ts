/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import {Strict} from "@raccoons-co/ethics";

/**
 * Represents a {@link https://docs.docker.com/engine/reference/builder/#copy | COPY} instruction.
 */
export default class Expose extends AbstractInstruction implements Committable {

    private constructor(port: string) {
        super("EXPOSE", port);
    }

    /** Returns a new `Expose` instruction of given TCP port. */
    public static ofTcp(port: number): Expose {
        Expose.isValid(port);
        return new Expose(`${port.toString()}/tcp`);
    }

    /** Returns a new `Expose` instruction of given UDP port. */
    public static ofUdp(port: number): Expose {
        Expose.isValid(port);
        return new Expose(`${port.toString()}/udp`);
    }

    private static isValid(port: number): void {
        Strict.notNull(port);
        Strict.checkArgument(Number.isInteger(port));
        Strict.checkArgument(port >= 0 && port <= 65535, `${port} Illegal port number `);
    }
}
