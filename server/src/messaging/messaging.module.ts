import { Module, forwardRef } from "@nestjs/common";
import { MessagingGetaway } from "./messaging.getaway";
import { LoggerModule } from "src/use-cases/logger/logger.module";
import { LectureModule } from "src/use-cases/lecture/lecture.module";

@Module({
    imports: [forwardRef(() => LectureModule), LoggerModule],
    providers: [
        MessagingGetaway,
    ],
    exports: [MessagingGetaway]
})
export class MessagingModule { }