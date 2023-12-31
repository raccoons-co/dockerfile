import {CleanWayBuilder} from "@raccoons-co/cleanway";
import ArgTest from "./instructions/ArgTest";
import CmdTest from "./instructions/CmdTest";
import CommentDirectiveTest from "./instructions/CommentDirectiveTest";
import CopyTest from "./instructions/CopyTest";
import EntryPointTest from "./instructions/EntryPointTest";
import EnvTest from "./instructions/EnvTest";
import ExposeTest from "./instructions/ExposeTest";
import FromTest from "./instructions/FromTest";
import HealthCheckTest from "./instructions/HealthCheckTest";
import LabelTest from "./instructions/LabelTest";
import OnBuildTest from "./instructions/OnBuildTest";
import RunTest from "./instructions/RunTest";
import ShellTest from "./instructions/ShellTest";
import StopSignalTest from "./instructions/StopSignalTest";
import UserTest from "./instructions/UserTest";
import VolumeTest from "./instructions/VolumeTest";
import WorkdirTest from "./instructions/WorkdirTest";
import BuildStageTest from "./BuildStageTest";
import DockerfileTest from "./DockerfileTest";
import DockerfileWriterTest from "./DockerfileWriterTest";
import DockerfileIntegrationTest from "./DockerfileIntegrationTest";
import PackageJsonTest from "./utils/PackageJsonTest";
import AddTest from "./instructions/AddTest";

CleanWayBuilder.instance()
    .use(AddTest)
    .use(ArgTest) // Dockerfile instructions tests
    .use(CmdTest)
    .use(CommentDirectiveTest)
    .use(CopyTest)
    .use(EntryPointTest)
    .use(EnvTest)
    .use(ExposeTest)
    .use(FromTest)
    .use(HealthCheckTest)
    .use(LabelTest)
    .use(OnBuildTest)
    .use(RunTest)
    .use(ShellTest)
    .use(StopSignalTest)
    .use(UserTest)
    .use(VolumeTest)
    .use(WorkdirTest)
    .use(BuildStageTest) // Dockerfile test
    .use(DockerfileTest)
    .use(DockerfileWriterTest)
    .use(DockerfileIntegrationTest)
    .use(PackageJsonTest)
    .build();
