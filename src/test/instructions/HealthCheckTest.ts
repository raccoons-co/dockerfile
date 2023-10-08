/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {Cmd} from "../../main";
import HealthCheck from "../../main/instructions/HealthCheck";

@TestClass
export default class HealthCheckTest {

    @Test
    public returnsHealthCheckNoneInstruction(): void {
        const instruction = HealthCheck.ofNone();
        assert.equal(instruction.toString(), "HEALTHCHECK NONE");
    }

    @Test
    public returnsHealthCheckInstruction(): void {
        const checkCmd = Cmd.of("curl -f http://localhost/ || exit 1");
        const instruction = HealthCheck.of(checkCmd, "--interval=5m --timeout=3s");
        assert.equal(instruction.toString(),
            "HEALTHCHECK --interval=5m --timeout=3s \\\n  CMD curl -f http://localhost/ || exit 1");
    }
}
