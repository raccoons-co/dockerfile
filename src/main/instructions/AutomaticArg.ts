/*
 * Copyright 2023, Raccoons. Developing simple way to change.
 *
 * @license MIT
 */

/**
 * Represents {@link https://docs.docker.com/engine/reference/builder/#automatic-platform-args-in-the-global-scope}.
 */
export enum AutomaticArg {
    TARGETPLATFORM = "TARGETPLATFORM",
    TARGETOS = "TARGETOS",
    TARGETARCH = "TARGETARCH",
    TARGETVARIANT = "TARGETVARIANT",
    BUILDPLATFORM = "BUILDPLATFORM",
    BUILDOS = "BUILDOS",
    BUILDARCH = "BUILDARCH",
    BUILDVARIANT = "BUILDVARIANT"
}
