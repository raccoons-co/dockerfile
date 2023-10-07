/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Arguments, ArgumentsSource, ParameterizedTest, Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Expose} from "../../main";

@TestClass
export default class ExposeTest {

    @Test
    public returnsExposeTcpInstruction(): void {
        const instruction = Expose.ofTcp(80);
        assert.equal(instruction.toString(), "EXPOSE 80/tcp");
    }

    @Test
    public returnsCorrectExposeUdpInstruction(): void {
        const instruction = Expose.ofUdp(80);
        assert.equal(instruction.toString(), "EXPOSE 80/udp");
    }

    @ParameterizedTest
    @ArgumentsSource(Array.of(
        new Arguments(null),
        new Arguments(undefined),
        new Arguments(65536),
        new Arguments(-1)
    ))
    public throwsExceptionIfIllegalPortNumber(): void {
        assert.throws(() => Expose.ofTcp(65536));
    }
}
