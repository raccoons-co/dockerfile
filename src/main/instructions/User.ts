/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import AbstractInstruction from "./AbstractInstruction";
import Committable from "./Committable";
import {Optional, Strict} from "@raccoons-co/ethics";

/**
 * Represents an {@link https://docs.docker.com/engine/reference/builder/#user | USER} instruction.
 */
export default class User extends AbstractInstruction implements Committable {

    private constructor(userOrUserWithGroup: string) {
        super("USER", userOrUserWithGroup);
    }

    /** Returns a new User instruction of given user and optionally the user group. */
    public static of(user: string, group?: string): User {
        Strict.notNull(user);
        const maybeGroup = Optional.ofNullable(group);
        return maybeGroup.isEmpty()
            ? new User(user)
            : new User(`${user}:${maybeGroup.get()}`);
    }
}
