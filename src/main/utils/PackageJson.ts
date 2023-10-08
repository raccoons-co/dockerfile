/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

import {Strict} from "@raccoons-co/ethics";
import * as path from "path";
import * as fs from "fs";

/**
 * Package.json utility.
 */
export default class PackageJson {

    private static readonly FILE = "package.json";

    private constructor() {
        // Intentionally empty
    }

    /** Returns the object representation of yhe `Package.json` of the current project. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static toObject(): any {
        return JSON.parse(PackageJson.packageJsonContent());
    }

    private static projectRoot(): string {
        return Strict.notNull(process.env.INIT_CWD, "INIT_CWD is undefined");
    }

    private static path(): string {
        return path.join(PackageJson.projectRoot(), PackageJson.FILE);
    }

    private static packageJsonContent(): string {
        return fs.readFileSync(PackageJson.path(), "utf8");
    }
}
