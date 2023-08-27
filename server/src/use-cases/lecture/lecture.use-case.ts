import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { MessagingGetaway } from "src/messaging/messaging.getaway";
import { LoggerUseCases } from "../logger/logger.use-case";
import { TimerEnum } from "src/core/common/enums/timer.enum";
import { CodeEnum } from "src/core/common/enums/code,enum";
import { Encoding } from "src/core/common/encoding";

@Injectable()
export class LectureUseCases {
    @Inject(forwardRef(() => MessagingGetaway))
    private messagingGetaway: MessagingGetaway;

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    async getAllLectures(): Promise<Map<string, Set<string>>> {
        return this.messagingGetaway.getAllRooms();
    }

    startLectureTimer(groupId: any) {
        try {
            this.messagingGetaway.sendTimerEventToLecture(groupId, TimerEnum.start);

            var counter = 60; // pull from db
            var timer = setInterval(() => {
                this.messagingGetaway.sendTimerEventToLecture(groupId, TimerEnum.tick, counter);
                if (counter > 0) {
                    counter--;
                }
            }, 1000);

            // store timer in redis
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    stopLectureTimer(groupId: any) {
        try {
            // clearInterval(timerId)
            // remove from redis
            this.messagingGetaway.sendTimerEventToLecture(groupId, TimerEnum.stop);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    generateCode(groupId: any) {
        try {
            // remove from redis old one
            // check if the code is already generated, don't generate twice
            let code = Encoding.generateRandomCode();
            this.messagingGetaway.sendCodeEventToLecture(groupId, CodeEnum.generated, code);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }
}