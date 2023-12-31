/*
 *  Copyright 2023, Raccoons. Developing simple way to change.
 *
 *  @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import {Strict} from "@raccoons-co/ethics";
import Cmd from "./Cmd";

/**
 *  Represents a {@link https://docs.docker.com/engine/reference/builder/#healthcheck | HEALTHCHECK} instruction.
 */
export default class HealthCheck extends AbstractInstruction implements Committable {

    private constructor(command: string) {
        super("HEALTHCHECK", command);
    }

    /** Returns a new `HealthCheck` instruction of given command and optionally options. */
    public static of(command: Cmd, options?: string): HealthCheck {
        Strict.notNull(command);
        return options
            ? new HealthCheck(`${options} \\\n  ${command.toString()}`)
            : new HealthCheck(command.toString());
    }

    public static ofNone(): HealthCheck {
        return new HealthCheck("NONE");
    }
}
