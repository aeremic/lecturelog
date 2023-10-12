import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { MessagingGetaway } from 'src/messaging/messaging.getaway';
import { LoggerUseCases } from '../logger/logger.use-case';
import { TimerEnum } from 'src/core/common/enums/timer.enum';
import { CodeEnum } from 'src/core/common/enums/code.enum';
import { Encoding } from 'src/core/common/encoding';
import { ActiveLectureEntity } from 'src/core/entities/active-lecture.entity';
import { ActiveLectureIdentity } from 'src/core/entities/active-lecture-identity.entity';
import { ExternalCacheSevice } from 'src/services/external-cache/external-cache.service';
import { CacheKeys } from 'src/core/common/constants/cache.constants';
import { ActiveLecturesEntity } from 'src/core/entities/active-lectures.entity';

@Injectable()
export class LectureUseCases {
  //#region Properties

  @Inject(forwardRef(() => MessagingGetaway))
  private messagingGetaway: MessagingGetaway;

  @Inject(LoggerUseCases)
  private loggerUseCases: LoggerUseCases;

  //#endregion

  //#region Constructors

  constructor(private readonly externalCache: ExternalCacheSevice) {}

  //#endregion

  //#region Public methods

  /**
   * Gets all lectures from external cache
   * @returns Promise<ActiveLectureIdentity[]>
   */
  async getActiveLecturesFromExternalCache(): Promise<ActiveLectureIdentity[]> {
    let result: ActiveLectureIdentity[] = [];
    try {
      const activeLectures = JSON.parse(
        await this.externalCache.get(CacheKeys.Lectures, null),
      );
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
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }

    return result;
  }

  /**
   * Parse given subjects to lecture entities
   * @param lectureKeys List of subjects as a string type
   * @returns
   */
  async parseLectureKeysToLectures(
    lectureKeys: string,
  ): Promise<ActiveLectureIdentity[]> {
    const result: ActiveLectureIdentity[] = [];
    try {
      const subjectsParsed = JSON.parse(lectureKeys);

      if (subjectsParsed && subjectsParsed.length > 0) {
        subjectsParsed.forEach((subject) => {
          const lecture: ActiveLectureIdentity = {
            subjectId: subject.subjectId,
            userId: subject.userId,
          };

          result.push(lecture);
        });
      }
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }

    return result;
  }

  /**
   * Save lecture to external cache
   * @param lectureKey
   */
  async saveLecture(lectureKey: string) {
    try {
      let lectureKeys: string[] = JSON.parse(
        await this.externalCache.get(CacheKeys.Lectures, null),
      );
      if (!lectureKeys) {
        lectureKeys = [];
      }

      lectureKeys.push(lectureKey);
      await this.externalCache.set(CacheKeys.Lectures, lectureKeys);
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }
  }

  /**
   * Remove lecture from external cache
   * @param lectureKey
   */
  async removeLecture(lectureKey: string) {
    try {
      let lectureKeys = JSON.parse(
        await this.externalCache.get(CacheKeys.Lectures, null),
      );
      if (lectureKeys) {
        lectureKeys = lectureKeys.filter(
          (element: string) => element != lectureKey,
        );

        await this.externalCache.set(CacheKeys.Lectures, lectureKeys);
      }
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }
  }

  /**
   * Save active lecture work to external cache
   * @param lectureKey Identifier as a string
   * @param code
   * @param timerId
   */
  async saveLectureWork(lectureKey: string, code: string, timerId: number) {
    try {
      const lectureIdentity: ActiveLectureIdentity = JSON.parse(lectureKey);

      const lecture: ActiveLectureEntity = {
        userId: lectureIdentity.userId,
        subjectId: lectureIdentity.subjectId,
        code: code,
        timerId: timerId,
      };

      let lecturesEntity: ActiveLecturesEntity = JSON.parse(
        await this.externalCache.get(CacheKeys.ActiveLectures, null),
      );

      if (!lecturesEntity) {
        lecturesEntity = new ActiveLecturesEntity();
        lecturesEntity.ActiveLectures = [];
      }

      lecturesEntity.ActiveLectures.push(lecture);

      await this.externalCache.set(CacheKeys.ActiveLectures, lecturesEntity);
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }
  }

  /**
   * Remove active lecture work from external cache
   * @param lectureKey
   */
  async removeLectureWork(lectureKey: string) {
    try {
      const lectureIdentity: ActiveLectureIdentity = JSON.parse(lectureKey);

      const lecturesEntity: ActiveLecturesEntity = JSON.parse(
        await this.externalCache.get(CacheKeys.ActiveLectures, null),
      );

      if (lecturesEntity && lecturesEntity.ActiveLectures.length > 0) {
        const lectureForRemoval: ActiveLectureEntity =
          lecturesEntity.ActiveLectures.find(
            (element: ActiveLectureEntity) =>
              element.userId == lectureIdentity.userId &&
              element.subjectId == lectureIdentity.subjectId,
          );

        if (lectureForRemoval) {
          if (lectureForRemoval.timerId) {
            clearInterval(lectureForRemoval.timerId);
          }
        }

        lecturesEntity.ActiveLectures = lecturesEntity.ActiveLectures.filter(
          (element: ActiveLectureEntity) =>
            element.userId != lectureIdentity.userId ||
            element.subjectId != lectureIdentity.subjectId,
        );

        await this.externalCache.set(CacheKeys.ActiveLectures, lecturesEntity);
      }

      this.messagingGetaway.sendCodeEventToRoom(
        JSON.stringify(lectureIdentity),
        CodeEnum.notGenerated,
      );
      this.messagingGetaway.sendTimerEventToRoom(
        JSON.stringify(lectureIdentity),
        TimerEnum.stop,
      );
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }
  }

  /**
   * Lecture work processing method
   * @param lectureKey
   */
  async doLectureWork(lectureKey: string) {
    try {
      await this.removeLectureWork(lectureKey);

      const code = Encoding.generateRandomCode();
      this.messagingGetaway.sendTimerEventToRoom(lectureKey, TimerEnum.start);
      this.messagingGetaway.sendCodeEventToRoom(
        lectureKey,
        CodeEnum.generated,
        code,
      );

      let counter = 60;
      const timer = setInterval(() => {
        if (counter > 0) {
          this.messagingGetaway.sendTimerEventToRoom(
            lectureKey,
            TimerEnum.tick,
            counter,
          );
          counter--;
        } else if (counter == 0) {
          this.removeLectureWork(lectureKey);
          counter--;
        }
      }, 1000);

      await this.saveLectureWork(lectureKey, code, timer[Symbol.toPrimitive]());
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }
  }

  // TODO: Key change
  /**
   * Get last code event by given active lecture entity
   * @param activeLecture Active lecture for matching code event
   * @returns Promise<CodeEnum>
   */
  async getCodeEventByActiveLecture(
    activeLecture: ActiveLectureIdentity,
  ): Promise<CodeEnum> {
    let result: CodeEnum = CodeEnum.notGenerated;
    try {
      const lecture = JSON.parse(
        await this.externalCache.get(CacheKeys.ActiveLectures, ``),
      );
      if (lecture) {
        result = CodeEnum.generated;
      }
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }

    return result;
  }

  // TODO: Key change
  /**
   * Get last code by given active lecture entity
   * @param activeLecture Active lecture identifier for matching code
   * @returns Promise<stirng>
   */
  async getCodeByActiveLecture(
    activeLecture: ActiveLectureIdentity,
  ): Promise<string> {
    let result: undefined;
    try {
      const lecture = JSON.parse(
        await this.externalCache.get(CacheKeys.ActiveLectures, ``),
      );
      if (lecture) {
        result = lecture.code;
      }
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }

    return result;
  }

  //#endregion
}
