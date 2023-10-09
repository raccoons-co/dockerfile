import Dockerfile from "./Dockerfile";
import DockerfileBuilder from "./DockerfileBuilder";
import BuildStage from "./BuildStage";
import BuildStageBuilder from "./BuildStageBuilder";
import InitBuildStageBuilder from "./InitBuildStageBuilder";
import DockerfileInstruction from "./DockerfileInstruction";
import Committable from "./instructions/Committable";
import Arg from "./instructions/Arg";
import {AutomaticArg} from "./instructions/AutomaticArg";
import Cmd from "./instructions/Cmd";
import Copy from "./instructions/Copy";
import Env from "./instructions/Env";
import Expose from "./instructions/Expose";
import Label from "./instructions/Label";
import OnBuild from "./instructions/OnBuild";
import Run from "./instructions/Run";
import User from "./instructions/User";
import Volume from "./instructions/Volume";
import Workdir from "./instructions/Workdir";
import PackageJson from "./utils/PackageJson";

/**
 * The Dockerfile generation API.
 *
 * @packageDocumentation
 * @public
 */
export {
    BuildStage,
    InitBuildStageBuilder,
    BuildStageBuilder,
    Dockerfile,
    DockerfileBuilder,
    DockerfileInstruction,
    Committable,
    Arg,
    AutomaticArg,
    Cmd,
    Copy,
    Env,
    Expose,
    Label,
    OnBuild,
    Run,
    User,
    Volume,
    Workdir,
    PackageJson
};
