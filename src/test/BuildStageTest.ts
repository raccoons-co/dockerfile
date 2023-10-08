/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Test, TestClass} from "@raccoons-co/cleanway";
import {Optional} from "@raccoons-co/ethics";
import {assert} from "chai";
import {BuildStage, Env} from "../main";
import From from "../main/instructions/From";

@TestClass
export default class BuildStageTest {

    @Test
    public setsStageFrom(): void {
        const buildStage =
            BuildStage.newBuilder()
                .setFrom("scratch")
                .build();

        assert.lengthOf(buildStage.instructions(), 1);
        assert.deepEqual(buildStage.instructions().at(0), From.of("scratch", Optional.empty()));
    }

    @Test
    public setsStageName(): void {
        const buildStage =
            BuildStage.newBuilder()
                .setName("microservice")
                .setFrom("scratch")
                .build();

        assert.equal(buildStage.name(), "microservice");
    }

    @Test
    public addsLayer(): void {
        const variable = Env.of("NODE_ENV", "production");
        const buildStage =
            BuildStage.newBuilder()
                .setFrom("scratch")
                .addLayer(variable)
                .build();

        assert.lengthOf(buildStage.instructions(), 2);
        assert.deepEqual(buildStage.instructions().at(1), variable);
    }
}
