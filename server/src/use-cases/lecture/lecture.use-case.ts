import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { MessagingGetaway } from "src/messaging/messaging.getaway";
import { LoggerUseCases } from "../logger/logger.use-case";
import { TimerEnum } from "src/core/common/enums/timer.enum";
import { CodeEnum } from "src/core/common/enums/code,enum";
import { Encoding } from "src/core/common/encoding";
import { LectureEntity } from "src/core/entities/lecture.entity";
import { ActiveLectureEntity } from "src/core/entities/active-lecture.entity";
import { ExternalCacheSevice } from "src/services/external-cache/external-cache.service";

@Injectable()
export class LectureUseCases {
    @Inject(forwardRef(() => MessagingGetaway))
    private messagingGetaway: MessagingGetaway;

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    constructor(private readonly externalCache: ExternalCacheSevice) { }

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
            let activeLectures = JSON.parse(await this.externalCache.get("subjects"));
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
     * Parse given subjects to active lecture entities
     * @param subjectKeys List of subjects as a string type
     * @returns 
     */
    parseSubjectKeysToLectures(subjectKeys: string): ActiveLectureEntity[] {
        let result: ActiveLectureEntity[] = []
        try {
            let subjectsParsed = JSON.parse(subjectKeys);

            if (subjectsParsed && subjectsParsed.length > 0) {
                subjectsParsed.forEach(subject => {
                    let lecture: ActiveLectureEntity = {
                        subjectId: subject.subjectId,
                        userId: subject.userId
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
     * @param subjectKey 
     */
    async saveLecture(subjectKey: string) {
        try {
            let subjectKeys: string[] = JSON.parse(await this.externalCache.get("subjects"))
            if (!subjectKeys) {
                subjectKeys = []
            }

            subjectKeys.push(subjectKey);
            await this.externalCache.set('subjects', subjectKeys);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    /**
     * Remove active lecture from external cache
     * @param subjectKey 
     */
    async removeLecture(subjectKey: string) {
        try {
            let subjectKeys = JSON.parse(await this.externalCache.get("subjects"))
            if (subjectKeys) {
                subjectKeys = subjectKeys.filter((element: string) => element != subjectKey);

                await this.externalCache.set('subjects', subjectKeys);
            }
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    /**
     * Save active lecture work to external cache
     * @param subjectKey 
     * @param code 
     * @param timerId 
     */
    async saveLectureWork(subjectKey: string, code: string, timerId: number) {
        try {
            let lecture: LectureEntity = {
                subject: subjectKey,
                code: code,
                timer: timerId
            }

            await this.externalCache.set(subjectKey, lecture);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    /**
     * Remove active lecture work from external cache
     * @param subjectKey 
     */
    async removeLectureWork(subjectKey: string) {
        try {
            let lecture = JSON.parse(await this.externalCache.get(subjectKey));
            if (lecture) {
                if (lecture.timer) {
                    clearInterval(lecture.timer);
                }
                await this.externalCache.delete(subjectKey);
            }

            this.messagingGetaway.sendCodeEventToRoom(subjectKey, CodeEnum.notGenerated);
            this.messagingGetaway.sendTimerEventToRoom(subjectKey, TimerEnum.stop);
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    /**
     * Lecture work processing method
     * @param subjectKey 
     */
    async doLectureWork(subjectKey: string) {
        try {
            await this.removeLectureWork(subjectKey);

            var code = Encoding.generateRandomCode();
            this.messagingGetaway.sendTimerEventToRoom(subjectKey, TimerEnum.start);
            this.messagingGetaway.sendCodeEventToRoom(subjectKey, CodeEnum.generated, code);

            var counter = 60;
            var timer = setInterval(() => {
                if (counter > 0) {
                    this.messagingGetaway.sendTimerEventToRoom(subjectKey, TimerEnum.tick, counter);
                    counter--;
                } else if (counter == 0) {
                    this.removeLectureWork(subjectKey);
                    counter--;
                }
            }, 1000);

            this.saveLectureWork(subjectKey, code, timer[Symbol.toPrimitive]());
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }
    }

    /**
     * Get last code event by given active lecture entity
     * @param activeLecture Active lecture for matching code event
     * @returns Promise<CodeEnum>
     */
    async getCodeEventByActiveLecture(activeLecture: ActiveLectureEntity): Promise<CodeEnum> {
        let result: CodeEnum = CodeEnum.notGenerated;
        try {
            let lecture = JSON.parse(await this.externalCache.get(JSON.stringify(activeLecture)));
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
     * @param activeLecture Active lecture for matching code
     * @returns Promise<stirng>
     */
    async getCodeByActiveLecture(activeLecture: ActiveLectureEntity): Promise<string> {
        let result: undefined;
        try {
            let lecture = JSON.parse(await this.externalCache.get(JSON.stringify(activeLecture)));
            if (lecture) {
                result = lecture.code;
            }
        } catch (error) {
            this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
        }

        return result;
    }
}