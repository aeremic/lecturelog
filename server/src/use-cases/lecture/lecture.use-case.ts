import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { MessagingGetaway } from "src/messaging/messaging.getaway";
import { LoggerUseCases } from "../logger/logger.use-case";
import { TimerEnum } from "src/core/common/enums/timer.enum";
import { CodeEnum } from "src/core/common/enums/code,enum";
import { Encoding } from "src/core/common/encoding";
import { LectureEntity } from "src/core/entities/lecture.entity";
import { ActiveLectureEntity } from "src/core/entities/active-lecture.entity";
import { ExternalCache } from "src/services/external-cache-service/external-cache.service";

@Injectable()
export class LectureUseCases {
    @Inject(forwardRef(() => MessagingGetaway))
    private messagingGetaway: MessagingGetaway;

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    constructor(private readonly externalCache: ExternalCache) {
    }

    /**
     * Gets all active lectures from server's cache
     * @returns ActiveLEctureEntity[]
     */
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

    /**
     * Gets all active lectures from external cache
     * @returns Promise<ActiveLectureEntity[]>
     */
    async getActiveLecturesFromExternalCache(): Promise<ActiveLectureEntity[]> {
        let result: ActiveLectureEntity[] = [];
        try {
            let activeLectures = JSON.parse(await this.externalCache.get("groups"));
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

    /**
     * Parse given groups to active lecture entities
     * @param groups List of groups as a string type
     * @returns 
     */
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

    /**
     * Save active lecture to external cache
     * @param group 
     */
    async saveLecture(group: string) {
        try {
            let groups: string[] = JSON.parse(await this.externalCache.get("groups"))
            if (!groups) {
                groups = []
            }

            groups.push(group);
            await this.externalCache.set('groups', groups);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    /**
     * Remove active lecture from external cache
     * @param group 
     */
    async removeLecture(group: string) {
        try {
            let groups = JSON.parse(await this.externalCache.get("groups"))
            if (groups) {
                groups = groups.filter((element: string) => element != group);

                await this.externalCache.set('groups', groups);
            }
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    /**
     * Save active lecture work to external cache
     * @param group 
     * @param code 
     * @param timerId 
     */
    async saveLectureWork(group: string, code: string, timerId: number) {
        try {
            let lecture: LectureEntity = {
                group: group,
                code: code,
                timer: timerId
            }

            await this.externalCache.set(group, lecture);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    /**
     * Remove active lecture work from external cache
     * @param group 
     */
    async removeLectureWork(group: string) {
        try {
            let lecture = JSON.parse(await this.externalCache.get(group));
            if (lecture) {
                if (lecture.timer) {
                    clearInterval(lecture.timer);
                }
                await this.externalCache.delete(group);
            }

            this.messagingGetaway.sendCodeEventToGroup(group, CodeEnum.notGenerated);
            this.messagingGetaway.sendTimerEventToGroup(group, TimerEnum.stop);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    /**
     * Lecture work processing method
     * @param group 
     */
    async doLectureWork(group: string) {
        try {
            await this.removeLectureWork(group);

            var code = Encoding.generateRandomCode();
            this.messagingGetaway.sendTimerEventToGroup(group, TimerEnum.start);
            this.messagingGetaway.sendCodeEventToGroup(group, CodeEnum.generated, code);

            var counter = 60;
            var timer = setInterval(() => {
                if (counter > 0) {
                    this.messagingGetaway.sendTimerEventToGroup(group, TimerEnum.tick, counter);
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

    /**
     * Get last code event by given active lecture entity
     * @param group Active lecture for matching code event
     * @returns Promise<CodeEnum>
     */
    async getCodeEventByGroup(group: ActiveLectureEntity): Promise<CodeEnum> {
        let result: CodeEnum = CodeEnum.notGenerated;
        try {
            let lecture = JSON.parse(await this.externalCache.get(JSON.stringify(group)));
            if (lecture) {
                result = CodeEnum.generated;
            }
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }

        return result;
    }

    /**
     * Get last code by given active lecture entity
     * @param group Active lecture for matching code
     * @returns Promise<stirng>
     */
    async getCodeByGroup(group: ActiveLectureEntity): Promise<string> {
        let result: undefined;
        try {
            let lecture = JSON.parse(await this.externalCache.get(JSON.stringify(group)));
            if (lecture) {
                result = lecture.code;
            }
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }

        return result;
    }
}