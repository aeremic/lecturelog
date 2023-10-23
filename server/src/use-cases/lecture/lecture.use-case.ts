import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { MessagingGetaway } from 'src/messaging/messaging.getaway';
import { LoggerUseCases } from '../logger/logger.use-case';
import { TimerEnum } from 'src/core/common/enums/timer.enum';
import { ActiveLectureCodeState } from 'src/core/common/enums/code.enum';
import { Encoding } from 'src/core/common/encoding';
import { ActiveLectureEntity } from 'src/core/entities/active-lecture.entity';
import { ActiveLectureIdentity } from 'src/core/entities/active-lecture-identity.entity';
import { ExternalCacheSevice } from 'src/services/external-cache/external-cache.service';
import { CacheKeys } from 'src/core/common/constants/cache.constants';
import { ActiveLecturesEntity } from 'src/core/entities/active-lectures.entity';
import { JPathQueryBuilder } from 'src/core/common/jpath-query.builder';
import { ActiveLectureAttendee } from 'src/core/entities/active-lecture-attendee.entity';
import { DoLectureAttendingDto } from 'src/core/dtos/do-lecture-attending.dto';
import { ActiveLectureAttendeeDto } from 'src/core/dtos/responses/active-lecture-attendees.dto';
import { UserUseCases } from '../user/user.use-case';
import { UserEntity } from 'src/core/entities';

@Injectable()
export class LectureUseCases {
  //#region Properties

  @Inject(forwardRef(() => MessagingGetaway))
  private messagingGetaway: MessagingGetaway;

  @Inject(forwardRef(() => UserUseCases))
  private userUseCase: UserUseCases;

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
   * Parse given lecure keys to lecture identities
   * @param lectureKeys List of lecture keys as a string type
   * @returns
   */
  async parseLectureKeysToLectureIdentities(
    lectureKeys: string,
  ): Promise<ActiveLectureIdentity[]> {
    const result: ActiveLectureIdentity[] = [];
    try {
      const lectureKeysParsed = JSON.parse(lectureKeys);

      if (lectureKeysParsed && lectureKeysParsed.length > 0) {
        lectureKeysParsed.forEach((parsedKey) => {
          const lecture: ActiveLectureIdentity = {
            subjectId: parsedKey.subjectId,
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
   * Start lecture work by changing state of existing lecture if found, or by adding a new lecture
   * @param lectureKey Identifier as a string
   * @param state Code state
   * @param code Generated code
   * @param timerId NodeJS.Timer identifier
   */
  async startLectureWork(
    lectureKey: string,
    state: ActiveLectureCodeState,
    code: string,
    timerId: number,
  ) {
    try {
      const lectureIdentity: ActiveLectureIdentity = JSON.parse(lectureKey);

      let lecturesEntity: ActiveLecturesEntity = JSON.parse(
        await this.externalCache.get(CacheKeys.ActiveLectures, null),
      );

      if (!lecturesEntity) {
        lecturesEntity = new ActiveLecturesEntity();
        lecturesEntity.activeLectures = [];
      }

      const lectureForStarting: ActiveLectureEntity =
        lecturesEntity.activeLectures.find(
          (element: ActiveLectureEntity) =>
            element.subjectId == lectureIdentity.subjectId,
        );

      if (lectureForStarting) {
        lectureForStarting.state = ActiveLectureCodeState.generated;
        lectureForStarting.code = code;
        lectureForStarting.timerId = timerId;
      } else {
        const lectureForAdding: ActiveLectureEntity = {
          subjectId: lectureIdentity.subjectId,
          state: state,
          code: code,
          timerId: timerId,
          attendees: [],
        };

        lecturesEntity.activeLectures.push(lectureForAdding);
      }

      await this.externalCache.set(CacheKeys.ActiveLectures, lecturesEntity);
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }
  }

  /**
   * Stops lecture work by changing it's state
   * @param lectureKey
   */
  async stopLectureWork(lectureKey: string) {
    try {
      const lectureIdentity: ActiveLectureIdentity = JSON.parse(lectureKey);

      const lecturesEntity: ActiveLecturesEntity = JSON.parse(
        await this.externalCache.get(CacheKeys.ActiveLectures, null),
      );

      if (lecturesEntity && lecturesEntity.activeLectures.length > 0) {
        const lectureForStopping: ActiveLectureEntity =
          lecturesEntity.activeLectures.find(
            (element: ActiveLectureEntity) =>
              element.subjectId == lectureIdentity.subjectId,
          );

        if (lectureForStopping) {
          if (lectureForStopping.timerId) {
            clearInterval(lectureForStopping.timerId);
            lectureForStopping.timerId = null;
          }

          lectureForStopping.state = ActiveLectureCodeState.notGenerated;
          lectureForStopping.code = '';
          await this.externalCache.set(
            CacheKeys.ActiveLectures,
            lecturesEntity,
          );
        }
      }

      this.messagingGetaway.sendCodeEventToRoom(
        JSON.stringify(lectureIdentity),
        ActiveLectureCodeState.notGenerated,
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
   * Remove active lecture work from external cache
   * @param lectureKey
   */
  async removeLectureWork(lectureKey: string) {
    try {
      const lectureIdentity: ActiveLectureIdentity = JSON.parse(lectureKey);

      const lecturesEntity: ActiveLecturesEntity = JSON.parse(
        await this.externalCache.get(CacheKeys.ActiveLectures, null),
      );

      if (lecturesEntity && lecturesEntity.activeLectures.length > 0) {
        const lectureForStopping: ActiveLectureEntity =
          lecturesEntity.activeLectures.find(
            (element: ActiveLectureEntity) =>
              element.subjectId == lectureIdentity.subjectId,
          );

        if (lectureForStopping) {
          if (lectureForStopping.timerId) {
            clearInterval(lectureForStopping.timerId);
          }
        }

        lecturesEntity.activeLectures = lecturesEntity.activeLectures.filter(
          (element: ActiveLectureEntity) =>
            element.subjectId != lectureIdentity.subjectId,
        );

        await this.externalCache.set(CacheKeys.ActiveLectures, lecturesEntity);
      }

      this.messagingGetaway.sendCodeEventToRoom(
        JSON.stringify(lectureIdentity),
        ActiveLectureCodeState.notGenerated,
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
      await this.stopLectureWork(lectureKey);

      const code = Encoding.generateRandomCode();
      this.messagingGetaway.sendTimerEventToRoom(lectureKey, TimerEnum.start);
      this.messagingGetaway.sendCodeEventToRoom(
        lectureKey,
        ActiveLectureCodeState.generated,
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
          this.stopLectureWork(lectureKey);
          counter--;
        }
      }, 1000);

      await this.startLectureWork(
        lectureKey,
        ActiveLectureCodeState.generated,
        code,
        timer[Symbol.toPrimitive](),
      );
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }
  }

  /**
   * Get last code state by given active lecture entity
   * @param activeLecture Active lecture for matching code event
   * @returns Promise<ActiveLectureCodeState>
   */
  async getCodeStateByActiveLecture(
    activeLecture: ActiveLectureIdentity,
  ): Promise<ActiveLectureCodeState> {
    let result: ActiveLectureCodeState = ActiveLectureCodeState.notGenerated;
    try {
      const lecture =
        await this.getMatchedActiveLecturesFromExternalCacheBySubjectId(
          activeLecture.subjectId,
        );

      if (lecture) {
        result = lecture.state;
      }
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }

    return result;
  }

  /**
   * Get last code by given active lecture entity
   * @param activeLecture Active lecture identifier for matching code
   * @returns Promise<stirng>
   */
  async getCodeByActiveLecture(
    activeLecture: ActiveLectureIdentity,
  ): Promise<string> {
    let result: string;
    try {
      const lecture =
        await this.getMatchedActiveLecturesFromExternalCacheBySubjectId(
          activeLecture.subjectId,
        );

      if (lecture && lecture.state == ActiveLectureCodeState.generated) {
        result = lecture.code;
      }
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }

    return result;
  }

  async getActiveLectureAttendees(
    subjectId: number,
  ): Promise<ActiveLectureAttendeeDto[]> {
    const result: ActiveLectureAttendeeDto[] = [];
    try {
      const lecture: ActiveLectureEntity =
        await this.getMatchedActiveLecturesFromExternalCacheBySubjectId(
          subjectId,
        );

      if (lecture && lecture.attendees && lecture.attendees.length > 0) {
        const attendeeIds: number[] = lecture.attendees.map((item) => {
          return item.studentId;
        });

        const attendees: UserEntity[] = await this.userUseCase.getByIds(
          attendeeIds,
        );

        if (attendeeIds.length > 0) {
          for (let i = 0; i < attendees.length; i++) {
            result.push({
              id: attendees[i].id,
              email: attendees[i].email,
              firstname: attendees[i].firstname,
              index: attendees[i].index,
              year: attendees[i].year,
            });
          }
        }
      }
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }

    return result;
  }

  /**
   * Method for parsing attendance key to lecture entity.
   * @param attendKey Attendence key which contains user identifier and sent code that will be used for active lecture matching
   * @returns Matched active lecture entity if found
   */
  async parseAttendanceKeyToLecture(
    attendKey: string,
  ): Promise<ActiveLectureEntity> {
    let result: ActiveLectureEntity;
    try {
      const attendKeyParsed = JSON.parse(attendKey);

      if (attendKeyParsed) {
        result = await this.getMatchedActiveLecturesFromExternalCacheByCode(
          attendKeyParsed.code,
        );
      }
    } catch (error) {
      await this.loggerUseCases.logWithoutCode(error?.message, error?.stack);
    }

    return result;
  }

  /**
   * Main method for lecture attending. Gets active lecture by attendKey code and then checks if attendKey studentId doesn't exists in the list of attendees for that specific active lecture. If student id is not found, that id will be added to the list of active lecture attendees.
   * @param attendKey Attendance key
   * @returns true if attendance is allowed, otherwise false
   */
  async doLectureAttending(
    attendDto: DoLectureAttendingDto,
  ): Promise<ActiveLectureIdentity> {
    let result: ActiveLectureIdentity = undefined;

    const lecturesEntity: ActiveLecturesEntity = JSON.parse(
      await this.externalCache.get(CacheKeys.ActiveLectures, null),
    );

    if (lecturesEntity && lecturesEntity.activeLectures.length > 0) {
      const lecture: ActiveLectureEntity = lecturesEntity.activeLectures.find(
        (lecture) =>
          lecture.state == ActiveLectureCodeState.generated &&
          lecture.code == attendDto.code,
      );

      if (lecture) {
        const attendeeExist = lecture.attendees.find(
          (item) => item.studentId == attendDto.studentId,
        );

        if (!attendeeExist) {
          const newAttendee: ActiveLectureAttendee = {
            studentId: attendDto.studentId,
          };
          lecture.attendees.push(newAttendee);

          await this.externalCache.set(
            CacheKeys.ActiveLectures,
            lecturesEntity,
          );

          result = { subjectId: lecture.subjectId };
        }
      }
    }

    return result;
  }

  //#endregion

  //#region Private methods

  /**
   * Method for getting matched active lectures from the cache. Please note that cache will return array of matched lectures.
   * @param subjectId Identifier for matching active lecture
   * @returns Matched active lecture
   */
  private async getMatchedActiveLecturesFromExternalCacheBySubjectId(
    subjectId: number,
  ): Promise<ActiveLectureEntity> {
    let result = undefined;

    const path = JPathQueryBuilder()
      .addRoot()
      .addChildOperator()
      .addElement('activeLectures')
      .addChildOperator()
      .addSubscriptMatching('subjectId', subjectId);

    const matchedLectures: ActiveLectureEntity[] = JSON.parse(
      await this.externalCache.get(CacheKeys.ActiveLectures, path.query),
    );

    if (matchedLectures && matchedLectures.length > 0) {
      result = matchedLectures[0];
    }

    return result;
  }

  /**
   * Method for getting matched active lectures from the cache. Please note that cache will return array of matched lectures.
   * @param subjectId Identifier for matching active lecture
   * @returns Matched active lecture
   */
  private async getMatchedActiveLecturesFromExternalCacheByCode(
    code: string,
  ): Promise<ActiveLectureEntity> {
    let result = undefined;

    const path = JPathQueryBuilder()
      .addRoot()
      .addChildOperator()
      .addElement('activeLectures')
      .addChildOperator()
      .addSubscriptMatchingWithString('code', code);

    const matchedLectures: ActiveLectureEntity[] = JSON.parse(
      await this.externalCache.get(CacheKeys.ActiveLectures, path.query),
    );

    if (matchedLectures && matchedLectures.length > 0) {
      result = matchedLectures[0];
    }

    return result;
  }

  //#endregion
}
