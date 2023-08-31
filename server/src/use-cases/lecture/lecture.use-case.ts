import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { MessagingGetaway } from "src/messaging/messaging.getaway";
import { LoggerUseCases } from "../logger/logger.use-case";
import { TimerEnum } from "src/core/common/enums/timer.enum";
import { CodeEnum } from "src/core/common/enums/code,enum";
import { Encoding } from "src/core/common/encoding";
import { LectureEntity } from "src/core/entities/lecture.entity";
import { RedisService } from "src/services/redis.service";
import { stringify } from "flatted";

@Injectable()
export class LectureUseCases {
    @Inject(forwardRef(() => MessagingGetaway))
    private messagingGetaway: MessagingGetaway;

    @Inject(RedisService)
    private redisService: RedisService;

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    async getAllLectures(): Promise<Map<string, Set<string>>> {
        return this.messagingGetaway.getAllRooms();
    }

    async removeLectureWork(groupId: any) {
        try {
            let lecture = JSON.parse(await this.redisService.get(groupId));
            if (lecture) {
                if (lecture.timer) {
                    clearInterval(lecture.timer);
                }
                await this.redisService.delete(groupId);
            }

            this.messagingGetaway.sendCodeEventToLecture(groupId, CodeEnum.notGenerated);
            this.messagingGetaway.sendTimerEventToLecture(groupId, TimerEnum.stop);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    async saveLectureWork(groupId: any, code: string, timerId: number) {
        try {
            let lecture: LectureEntity = {
                groupId: groupId,
                code: code,
                timer: timerId
            }

            await this.redisService.set(groupId, lecture);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    async doLectureWork(groupId: any) {
        try {
            await this.removeLectureWork(groupId);

            var code = Encoding.generateRandomCode();
            this.messagingGetaway.sendTimerEventToLecture(groupId, TimerEnum.start);
            this.messagingGetaway.sendCodeEventToLecture(groupId, CodeEnum.generated, code);

            var counter = 60;
            var timer = setInterval(() => {
                if (counter > 0) {
                    this.messagingGetaway.sendTimerEventToLecture(groupId, TimerEnum.tick, counter);
                    counter--;
                } else if (counter == 0) {
                    this.removeLectureWork(groupId);
                    counter--;
                }
            }, 1000);

            this.saveLectureWork(groupId, code, timer[Symbol.toPrimitive]());
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }
}