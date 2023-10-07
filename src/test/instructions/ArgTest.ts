/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Arguments, ArgumentsSource, ParameterizedTest, Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Arg, AutomaticArg} from "../../main";

@TestClass
export default class ArgTest {

    @Test
    public returnsArgInstruction(): void {
        const instruction = Arg.of("CONT_IMG_VER");
        assert.equal(instruction.toString(), "ARG CONT_IMG_VER");
    }

    @Test
    public returnsArgWithDefaultValueInstruction(): void {
        const instruction = Arg.of("CONT_IMG_VER", "v1.0.0");
        assert.equal(instruction.toString(), "ARG CONT_IMG_VER=v1.0.0");
    }


    @ParameterizedTest
    @ArgumentsSource(Array.of(
        new Arguments(AutomaticArg.BUILDARCH, "ARG BUILDARCH"),
        new Arguments(AutomaticArg.BUILDOS, "ARG BUILDOS"),
        new Arguments(AutomaticArg.BUILDPLATFORM, "ARG BUILDPLATFORM"),
        new Arguments(AutomaticArg.BUILDVARIANT, "ARG BUILDVARIANT"),
        new Arguments(AutomaticArg.TARGETARCH, "ARG TARGETARCH"),
        new Arguments(AutomaticArg.TARGETOS, "ARG TARGETOS"),
        new Arguments(AutomaticArg.TARGETPLATFORM, "ARG TARGETPLATFORM"),
        new Arguments(AutomaticArg.TARGETVARIANT, "ARG TARGETVARIANT")
    ))
    public returnsAutomaticArgInstruction(automaticArg: AutomaticArg, expected: string): void {
        const instruction = Arg.ofAutomatic(automaticArg);
        assert.equal(instruction.toString(), expected);
    }
}
