import { Module } from "@nestjs/common";
import { LecturesGetaway } from "./messaging.getaway";
import { LoggerModule } from "src/use-cases/logger/logger.module";

@Module({
    imports: [LoggerModule],
    providers: [
        LecturesGetaway,
    ],
    exports: [LecturesGetaway]
})
export class MessagingModule { }