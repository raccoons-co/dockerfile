import {CleanWayBuilder} from "@raccoons-co/cleanway";
import ArgTest from "./instructions/ArgTest";
import CmdTest from "./instructions/CmdTest";
import CommentDirectiveTest from "./instructions/CommentDirectiveTest";
import CopyTest from "./instructions/CopyTest";
import EnvTest from "./instructions/EnvTest";
import ExposeTest from "./instructions/ExposeTest";
import FromTest from "./instructions/FromTest";
import LabelTest from "./instructions/LabelTest";
import RunTest from "./instructions/RunTest";
import UserTest from "./instructions/UserTest";
import WorkdirTest from "./instructions/WorkdirTest";
import BuildStageTest from "./BuildStageTest";
import DockerfileTest from "./DockerfileTest";
import DockerfileWriterTest from "./utils/DockerfileWriterTest";
import DockerfileIntegrationTest from "./DockerfileIntegrationTest";
import PackageJsonTest from "./utils/PackageJsonTest";

CleanWayBuilder.instance()
    .use(ArgTest) // Dockerfile instructions tests
    .use(CmdTest)
    .use(CommentDirectiveTest)
    .use(CopyTest)
    .use(EnvTest)
    .use(ExposeTest)
    .use(FromTest)
    .use(LabelTest)
    .use(RunTest)
    .use(UserTest)
    .use(WorkdirTest)
    .use(BuildStageTest) // Dockerfile test
    .use(DockerfileTest)
    .use(DockerfileWriterTest)
    .use(DockerfileIntegrationTest)
    .use(PackageJsonTest)
    .build();
