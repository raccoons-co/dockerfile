/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {Optional} from "@raccoons-co/ethics";
import {assert} from "chai";
import {From} from "../../main";

@TestClass
export default class FromTest {

    @Test
    public returnsFromInstruction(): void {
        const instruction = From.of("node:current-alpine", Optional.empty());
        assert.equal(instruction.toString(), "FROM node:current-alpine");
    }

    @Test
    public returnsFromAsInstruction(): void {
        const instruction = From.of("node:current-alpine", Optional.of("microservice"));
        assert.equal(instruction.toString(), "FROM node:current-alpine AS microservice");
    }
}
