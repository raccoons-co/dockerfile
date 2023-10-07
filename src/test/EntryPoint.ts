import {CleanWayBuilder} from "@raccoons-co/cleanway";
import YourTest from "./YourTest";

CleanWayBuilder.instance()
    .use(YourTest)
    .build();
