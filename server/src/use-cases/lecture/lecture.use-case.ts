import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { MessagingGetaway } from "src/messaging/messaging.getaway";
import { LoggerUseCases } from "../logger/logger.use-case";
import { TimerEnum } from "src/core/common/enums/timer.enum";
import { CodeEnum } from "src/core/common/enums/code,enum";
import { Encoding } from "src/core/common/encoding";
import { LectureEntity } from "src/core/entities/lecture.entity";
import { RedisService } from "src/services/redis.service";
import { ActiveLectureEntity } from "src/core/entities/active-lecture.entity";

@Injectable()
export class LectureUseCases {
    @Inject(forwardRef(() => MessagingGetaway))
    private messagingGetaway: MessagingGetaway;

    @Inject(RedisService)
    private redisService: RedisService;

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    getActiveLecturesFromCache(): ActiveLectureEntity[] {
        return [...this.messagingGetaway.getAllRooms().keys()]
            .map(function (key) {
                try {
                    return JSON.parse(key);
                } catch {
                    return null;
                }
            });
    }

    async getActiveLecturesFromExternalCache(): Promise<ActiveLectureEntity[]> {
        let result: ActiveLectureEntity[] = [];
        try {
            let activeLectures = JSON.parse(await this.redisService.get("groups"));
            if (activeLectures) {
                result = activeLectures.map(function (element: string) {
                    try {
                        return JSON.parse(element);
                    } catch {
                        return null;
                    }
                });
            }
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }

        return result;
    }

    parseGroupsToLectures(groups: string): ActiveLectureEntity[] {
        let result: ActiveLectureEntity[] = []
        try {
            let groupsParsed = JSON.parse(groups);

            if (groupsParsed && groupsParsed.length > 0) {
                groupsParsed.forEach(group => {
                    let lecture: ActiveLectureEntity = {
                        groupId: group.groupId,
                        userId: group.userId
                    }

                    result.push(lecture);
                });
            }
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }

        return result;
    }

    async saveLecture(group: string) {
        try {
            let groups: string[] = JSON.parse(await this.redisService.get("groups"))
            if (!groups) {
                groups = []
            }

            groups.push(group);
            await this.redisService.set('groups', groups);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    async removeLecture(group: string) {
        try {
            let groups = JSON.parse(await this.redisService.get("groups"))
            if (groups) {
                groups = groups.filter((element: string) => element != group);

                await this.redisService.set('groups', groups);
            }
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    async getLastCodeEventByGroup(group: any): Promise<CodeEnum> {
        let result: CodeEnum = CodeEnum.notGenerated;
        try {
            let lecture = JSON.parse(await this.redisService.get(JSON.stringify(group)));
            if (lecture) {
                result = CodeEnum.generated;
            }
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }

        return result;
    }

    async getCodeByGroup(group: any): Promise<string> {
        let result: undefined;
        try {
            let lecture = JSON.parse(await this.redisService.get(JSON.stringify(group)));
            if (lecture) {
                result = lecture.code;
            }
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }

        return result;
    }

    async saveLectureWork(group: any, code: string, timerId: number) {
        try {
            let lecture: LectureEntity = {
                group: group,
                code: code,
                timer: timerId
            }

            await this.redisService.set(group, lecture);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    async removeLectureWork(group: any) {
        try {
            let lecture = JSON.parse(await this.redisService.get(group));
            if (lecture) {
                if (lecture.timer) {
                    clearInterval(lecture.timer);
                }
                await this.redisService.delete(group);
            }

            this.messagingGetaway.sendCodeEventToLecture(group, CodeEnum.notGenerated);
            this.messagingGetaway.sendTimerEventToLecture(group, TimerEnum.stop);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    async doLectureWork(group: any) {
        try {
            await this.removeLectureWork(group);

            var code = Encoding.generateRandomCode();
            this.messagingGetaway.sendTimerEventToLecture(group, TimerEnum.start);
            this.messagingGetaway.sendCodeEventToLecture(group, CodeEnum.generated, code);

            var counter = 60;
            var timer = setInterval(() => {
                if (counter > 0) {
                    this.messagingGetaway.sendTimerEventToLecture(group, TimerEnum.tick, counter);
                    counter--;
                } else if (counter == 0) {
                    this.removeLectureWork(group);
                    counter--;
                }
            }, 1000);

            this.saveLectureWork(group, code, timer[Symbol.toPrimitive]());
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }
}