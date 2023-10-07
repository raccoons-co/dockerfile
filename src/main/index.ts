import Dockerfile from "./Dockerfile";
import DockerfileBuilder from "./DockerfileBuilder";
import BuildStage from "./BuildStage";
import BuildStageBuilder from "./BuildStageBuilder";
import InitBuildStageBuilder from "./InitBuildStageBuilder";
import DockerfileInstruction from "./instructions/DockerfileInstruction";
import Committable from "./instructions/Committable";
import Arg from "./instructions/Arg";
import {AutomaticArg} from "./instructions/AutomaticArg";
import Cmd from "./instructions/Cmd";
import Copy from "./instructions/Copy";
import Env from "./instructions/Env";
import Expose from "./instructions/Expose";
import From from "./instructions/From";
import Label from "./instructions/Label";
import Run from "./instructions/Run";
import User from "./instructions/User";
import Workdir from "./instructions/Workdir";
import PackageJson from "./utils/PackageJson";

/**
 * The Dockerfile generation API.
 *
 * @packageDocumentation
 * @public
 */
export {
    Dockerfile,
    DockerfileBuilder,
    BuildStage,
    InitBuildStageBuilder,
    BuildStageBuilder,
    DockerfileInstruction,
    Committable,
    Arg,
    AutomaticArg,
    Cmd,
    Copy,
    Env,
    Expose,
    From,
    Label,
    Run,
    User,
    Workdir,
    PackageJson
};
