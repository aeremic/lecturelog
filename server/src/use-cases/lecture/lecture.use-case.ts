import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { MessagingGetaway } from "src/messaging/messaging.getaway";
import { LoggerUseCases } from "../logger/logger.use-case";
import { TimerEnum } from "src/core/common/enums/timer.enum";

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
            this.messagingGetaway.sendTickEventToLecture(groupId, TimerEnum.start);

            var counter = 120; // pull from db
            var timer = setInterval(() => {
                this.messagingGetaway.sendTickEventToLecture(groupId, TimerEnum.tick);
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
            this.messagingGetaway.sendTickEventToLecture(groupId, TimerEnum.stop);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }
}