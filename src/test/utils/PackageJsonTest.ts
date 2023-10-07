/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */


import {Test, TestClass} from "@raccoons-co/cleanway";
import {assert} from "chai";
import {PackageJson} from "../../main";

@TestClass
export default class PackageJsonTest {

    @Test
    public returnsPackageJsonName(): void {
        const packageJson = PackageJson.toObject();
        assert.equal(packageJson.name, "@raccoons-co/dockerfile");
    }
}
