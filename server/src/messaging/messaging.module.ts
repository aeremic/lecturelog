import { Module } from "@nestjs/common";
import { LecturesGetaway } from "./messaging.getaway";

@Module({
    providers: [
        LecturesGetaway,
    ],
    exports: [LecturesGetaway]
})
export class MessagingModule { }