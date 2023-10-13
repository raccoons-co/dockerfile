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
import EntryPoint from "./instructions/EntryPoint";
import Env from "./instructions/Env";
import Expose from "./instructions/Expose";
import HealthCheck from "./instructions/HealthCheck";
import Label from "./instructions/Label";
import OnBuild from "./instructions/OnBuild";
import Run from "./instructions/Run";
import Shell from "./instructions/Shell";
import {Signal} from "./instructions/Signal";
import StopSignal from "./instructions/StopSignal";
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
    EntryPoint,
    Env,
    Expose,
    HealthCheck,
    Label,
    OnBuild,
    Run,
    Shell,
    Signal,
    StopSignal,
    User,
    Volume,
    Workdir,
    PackageJson
};
