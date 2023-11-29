import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserEntity } from 'src/core/entities/user.entity';
import { GenericUseCases } from '../generic.use-case';
import { LoggerUseCases } from '../logger/logger.use-case';
import {
  CsvParseUserErrorConstants,
  ErrorConstants,
  ErrorMessageConstants,
} from 'src/core/common/constants/error.constant';
import { ProfessorsDto } from 'src/core/dtos/responses/professors.dto';
import { BcryptService, MailService } from 'src/services';
import { Encoding } from 'src/core/common/encoding';
import { EmailVerificationUseCases } from '../emailverification/email-verification.use-case';
import {
  EmailRegistrationDto,
  UpdateUserPasswordRequestDto,
  UpdateUserPasswordResponseDto,
} from 'src/core/dtos';
import { ConfigService } from '@nestjs/config';
import { StudentsDto } from 'src/core/dtos/responses/students.dto';
import { RoleEnum } from 'src/core/common/enums/role.enum';
import { AllUsersExceptAdminDto } from 'src/core/dtos/responses/all-users-except-admin.dto';
import { AssignedSubjectDto } from 'src/core/dtos/responses/assigned-group.dto';
import { SubjectUseCases } from '../subject/subject.use-case';
import { AvailableGroupDto } from 'src/core/dtos/responses/available-group.dto';
import { SendEmailVerificationDto } from '../../core/dtos/requests/send-email-verification.dto';
import { CreateStudentRequestDto } from '../../core/dtos/requests/create-student.dto';
import { CreateUpdateUserResponseDto } from 'src/core/dtos/responses/create-update-user-response.dto';
import { CsvUploadResultDto } from 'src/core/dtos/responses/csv-upload-result.dto';
import { CsvParseResult } from 'src/core/common/enums/csv-parse.enum';
import { ParserService } from 'src/services/csv/parser.service';
import { RegexPattern } from 'src/core/common/constants/regex.constant';
import { LectureUseCases } from '../lecture/lecture.use-case';
import { SendPasswordResetEmailRequestDto } from 'src/core/dtos/requests/send-password-reset-email.dto';
import { SendPasswordResetEmailResponseDto } from 'src/core/dtos/responses/send-password-reset-email.dto';
import { ResetPasswordUseCases } from '../reset-password/reset-password.use-case';
import { ResetPasswordEntity } from 'src/core/entities/reset-password.entity';
import { ResetPasswordRequestDto } from 'src/core/dtos/requests/reset-password.dto';
import { ResetPasswordResponseDto } from 'src/core/dtos/responses/reset-password.dto';
import { GetUserDataDto } from 'src/core/dtos/responses/get-user-data.dto';

@Injectable()
export class UserUseCases extends GenericUseCases<UserEntity> {
  //#region Properties

  @Inject(UserRepositoryAbstract)
  private userRepository: UserRepositoryAbstract;

  @Inject(SubjectUseCases)
  private subjectUseCases: SubjectUseCases;

  @Inject(forwardRef(() => LectureUseCases))
  private lectureUseCase: LectureUseCases;

  @Inject(EmailVerificationUseCases)
  private emailVerificationUseCases: EmailVerificationUseCases;

  @Inject(ResetPasswordUseCases)
  private resetPasswordUseCases: ResetPasswordUseCases;

  @Inject(MailService)
  private mailService: MailService;

  @Inject(BcryptService)
  private bcryptService: BcryptService;

  @Inject(ParserService)
  private parserService: ParserService;

  @Inject(LoggerUseCases)
  private loggerUseCases: LoggerUseCases;

  @Inject()
  private readonly config: ConfigService;

  //#endregion

  //#region Public methods

  async get(): Promise<UserEntity[]> {
    return super.get(this.userRepository, this.loggerUseCases);
  }

  async getById(id: number): Promise<UserEntity> {
    return super.getById(this.userRepository, this.loggerUseCases, id);
  }

  async createOrUpdate(userEntity: UserEntity): Promise<UserEntity> {
    let result: UserEntity | PromiseLike<UserEntity>;
    try {
      result = await super.createOrUpdate(
        this.userRepository,
        this.loggerUseCases,
        userEntity,
      );
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async delete(id: number): Promise<number> {
    return super.delete(this.userRepository, this.loggerUseCases, id);
  }

  async getByFirstname(firstname: string): Promise<UserEntity> {
    let result: UserEntity | PromiseLike<UserEntity>;
    try {
      if (firstname) {
        result = await this.userRepository.getByFirstname(firstname);
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getByEmail(email: string, includeHash = false): Promise<UserEntity> {
    let result: UserEntity | PromiseLike<UserEntity>;
    try {
      if (email) {
        result = await this.userRepository.getByEmail(email, includeHash);
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getByUserEmail(userEntity: UserEntity): Promise<UserEntity> {
    let result: UserEntity | PromiseLike<UserEntity>;
    try {
      if (userEntity.email) {
        result = await this.userRepository.getByEmail(userEntity.email, false);
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getByIndex(
    index: number,
    year: number,
    includeHash = false,
  ): Promise<UserEntity> {
    let result: UserEntity | PromiseLike<UserEntity>;
    try {
      if (index && year) {
        result = await this.userRepository.getByIndex(index, year, includeHash);
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getProfessors(page: number, size: number): Promise<ProfessorsDto> {
    let result: ProfessorsDto | PromiseLike<ProfessorsDto>;
    let professors: UserEntity[] | PromiseLike<UserEntity[]>;
    let totalProfessorsCount: number | PromiseLike<number>;
    const skip = page * size;

    try {
      professors = await this.userRepository.getProfessors(size, skip);
      totalProfessorsCount = await this.userRepository.getProfessorsCount();

      result = {
        professors: professors,
        count: totalProfessorsCount,
      };
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getStudents(page: number, size: number): Promise<StudentsDto> {
    let result: StudentsDto | PromiseLike<StudentsDto>;
    let students: UserEntity[] | PromiseLike<UserEntity[]>;
    let totalStudentsCount: number | PromiseLike<number>;
    const skip = page * size;

    try {
      students = await this.userRepository.getStudents(size, skip);
      totalStudentsCount = await this.userRepository.getStudentsCount();

      result = {
        students: students,
        count: totalStudentsCount,
      };
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async createStudent(
    createStudentRequestDto: CreateStudentRequestDto,
  ): Promise<CreateUpdateUserResponseDto> {
    const user: UserEntity = {
      id: createStudentRequestDto.id,
      firstname: createStudentRequestDto.firstname,
      lastname: createStudentRequestDto.lastname,
      email: createStudentRequestDto.email,
      index: createStudentRequestDto.index,
      year: createStudentRequestDto.year,
      role: createStudentRequestDto.role,
    };

    return await this.createUser(user);
  }

  async createUser(
    userEntity: UserEntity,
  ): Promise<CreateUpdateUserResponseDto> {
    const result = new CreateUpdateUserResponseDto();
    try {
      if (await this.checkIfUserExist(userEntity)) {
        result.errorMessage = ErrorMessageConstants.UserExists;
        return result;
      }

      if (!this.isEmailPatternValid(userEntity.email)) {
        result.errorMessage = ErrorMessageConstants.EmailNotValid;
        return result;
      }

      userEntity.isActivated = false;
      const userInDb = await this.createOrUpdate(userEntity);
      await this.generateAndSendEmailVerificationCode(userInDb);

      result.id = userInDb.id;
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );
      result.errorMessage = error?.message;
    }

    return result;
  }

  async sendEmailVerification(
    sendEmailVerificationDto: SendEmailVerificationDto,
  ): Promise<boolean> {
    let result: boolean | PromiseLike<boolean> = false;
    try {
      const userInDb = await this.getById(sendEmailVerificationDto.userId);
      await this.generateAndSendEmailVerificationCode(userInDb);

      result = true;
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async emailRegistration(
    emailRegistrationDto: EmailRegistrationDto,
  ): Promise<boolean> {
    let result: boolean | PromiseLike<boolean> = false;
    try {
      const emailVerification =
        await this.emailVerificationUseCases.getLatestEmailVerificationByUserId(
          emailRegistrationDto.userId,
          emailRegistrationDto.code,
        );
      if (this.emailVerificationUseCases.isFound(emailVerification)) {
        const timeToRegister: number = this.config.get('REG_DURATION') ?? 60;
        const expirationDate: Date = new Date(
          emailVerification.sentOn.setMinutes(
            emailVerification.sentOn.getMinutes() + timeToRegister,
          ),
        );
        const currentDate: Date = new Date(Date.now());

        if (currentDate <= expirationDate) {
          const userInDb = await this.getById(emailRegistrationDto.userId);
          if (this.isFound(userInDb) && !userInDb.isActivated) {
            const hashedPassword: any =
              await this.bcryptService.createUserPassword(
                emailRegistrationDto.password,
                emailRegistrationDto.repeatedPassword,
              );

            if (hashedPassword) {
              userInDb.hash = hashedPassword;
              userInDb.isActivated = true;

              await this.createOrUpdate(userInDb);
              result = true;
            }
          }
        }
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async updateUser(
    userEntity: UserEntity,
  ): Promise<CreateUpdateUserResponseDto> {
    const result = new CreateUpdateUserResponseDto();
    try {
      const userInDb = await this.getById(userEntity.id);
      if (!this.isFound(userInDb)) {
        result.errorMessage = ErrorMessageConstants.UserDoesntExists;
        return result;
      }

      let isEmailChanged: boolean;
      if (userEntity.email && userEntity.email !== userInDb.email) {
        const getByEmailResult = await this.getByEmail(userEntity.email);
        if (
          this.isFound(getByEmailResult) &&
          userEntity.id !== getByEmailResult.id
        ) {
          result.errorMessage = ErrorMessageConstants.UserExists;
          return result;
        }

        if (!this.isEmailPatternValid(userEntity.email)) {
          result.errorMessage = ErrorMessageConstants.EmailNotValid;
          return result;
        }

        userEntity.hash = null;
        userEntity.isActivated = false;
        isEmailChanged = true;
      } else {
        userEntity.isActivated = userInDb.isActivated;
        isEmailChanged = false;
      }

      if (
        (userEntity.index && userEntity.index !== userInDb.index) ||
        (userEntity.year && userEntity.year !== userInDb.year)
      ) {
        const getByIndexResult = await this.getByIndex(
          userEntity.index,
          userEntity.year,
        );
        if (
          this.isFound(getByIndexResult) &&
          userInDb.id !== getByIndexResult.id
        ) {
          result.errorMessage = ErrorMessageConstants.UserExists;
          return result;
        }
      }

      if (!userEntity.role) {
        userEntity.role = userInDb.role;
      }

      await this.createOrUpdate(userEntity);
      if (isEmailChanged) {
        await this.generateAndSendEmailVerificationCode(userEntity);
      }

      result.id = userEntity.id;
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getAllExceptAdmin(): Promise<AllUsersExceptAdminDto> {
    let result: AllUsersExceptAdminDto | PromiseLike<AllUsersExceptAdminDto>;
    try {
      const users = await this.userRepository.getAllExceptAdmin();
      result = {
        professors: users.filter((u) => u.role == RoleEnum.professor),
        students: users.filter((u) => u.role == RoleEnum.student),
      };
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getProfessorAssignedSubjects(
    id: number,
  ): Promise<AssignedSubjectDto[]> {
    let result: AssignedSubjectDto[];
    try {
      const subjects = await this.subjectUseCases.getSubjectsByProfessorId(id);
      if (subjects) {
        result = [];
        subjects.forEach((subject) => {
          if (subject) {
            result.push({
              subjectId: subject.id,
              name: subject.name,
              userId: id,
            });
          }
        });

        if (result.length) {
          const activeSubjects =
            await this.lectureUseCase.getActiveLecturesFromExternalCache();
          if (activeSubjects) {
            result = result.filter(
              (element) =>
                !activeSubjects
                  .map(function (activeSubject) {
                    if (activeSubject && activeSubject.subjectId > -1) {
                      return activeSubject.subjectId;
                    }
                  })
                  .includes(element.subjectId),
            );
          }
        }
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getProfessorActiveAssignedSubjects(
    id: number,
  ): Promise<AssignedSubjectDto[]> {
    let result: AssignedSubjectDto[];
    try {
      const subjects = await this.subjectUseCases.getSubjectsByProfessorId(id);
      if (subjects) {
        result = [];
        subjects.forEach((subject) => {
          if (subject) {
            result.push({
              subjectId: subject.id,
              name: subject.name,
              userId: id,
            });
          }
        });

        if (result.length) {
          const activeSubjects =
            await this.lectureUseCase.getActiveLecturesFromExternalCache();
          if (activeSubjects) {
            result = result.filter((element) =>
              activeSubjects
                .map(function (activeSubject) {
                  if (activeSubject && activeSubject.subjectId > -1) {
                    return activeSubject.subjectId;
                  }
                })
                .includes(element.subjectId),
            );
          }
        }
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getStudentAvailableSubjects(id: number): Promise<AvailableGroupDto[]> {
    let result: AvailableGroupDto[];
    try {
      const subjects = await this.subjectUseCases.getSubjectsByStudentId(id);
      if (subjects) {
        result = [];
        subjects.forEach((subject) => {
          if (subject) {
            result.push({ subjectId: subject.id, name: subject.name });
          }
        });

        if (result.length) {
          const activeSubjects =
            await this.lectureUseCase.getActiveLecturesFromExternalCache();
          if (activeSubjects) {
            result = result.filter((element) =>
              activeSubjects
                .map(function (activeSubject) {
                  if (activeSubject && activeSubject.subjectId > -1) {
                    return activeSubject.subjectId;
                  }
                })
                .includes(element.subjectId),
            );
          }
        }
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async uploadProfessors(
    file: Express.Multer.File,
  ): Promise<CsvUploadResultDto> {
    const uploadResult: CsvUploadResultDto = {
      result: CsvParseResult.unsucessfull,
      errors: [],
    };

    try {
      const data = this.parserService.parseFile(
        ['id', 'email', 'firstname', 'lastname'],
        file,
      );
      for (let i = 0; i < data.length; i++) {
        if (data[i] && data[i].id != undefined && data[i].email != '') {
          const dataId = Number(data[i].id);
          if (Number.isNaN(dataId)) {
            uploadResult.errors.push(
              `${CsvParseUserErrorConstants.IdentifierNotValid} at position [${i}].`,
            );
          } else {
            const user: UserEntity = {
              id: dataId,
              email: data[i].email,
              firstname: data[i].firstname,
              lastname: data[i].lastname,
              role: RoleEnum.professor,
            };

            if (data[i].id == 0) {
              const createResult = await this.createUser(user);
              if (createResult.id === -1) {
                uploadResult.errors.push(
                  `${CsvParseUserErrorConstants.UserNotCreated} at position [${i}]. Message: ${createResult.errorMessage}`,
                );
              }
            } else {
              const updateResult = await this.updateUser(user);
              if (updateResult.id === -1) {
                uploadResult.errors.push(
                  `${CsvParseUserErrorConstants.UserNotUpdated} at position [${i}]. Message ${updateResult.errorMessage}`,
                );
              }
            }
          }
        } else {
          uploadResult.errors.push(
            `${CsvParseUserErrorConstants.UserDataNotValid} at position [${i}].`,
          );
        }
      }

      uploadResult.result =
        uploadResult.errors.length == 0
          ? CsvParseResult.successfull
          : CsvParseResult.unsucessfull;
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );
      uploadResult.errors.push(
        `${CsvParseUserErrorConstants.UserDataNotValid}[${error}].`,
      );
    }

    return uploadResult;
  }

  async generateUploadTemplate(): Promise<Buffer> {
    try {
      const template = await this.parserService.generateTemplate([
        'id',
        'email',
        'firstname',
        'lastname',
      ]);

      return Buffer.from(template, 'utf-8');
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );

      return Buffer.from([].toString(), 'utf-8');
    }
  }

  async uploadStudents(file: Express.Multer.File): Promise<CsvUploadResultDto> {
    const uploadResult: CsvUploadResultDto = {
      result: CsvParseResult.unsucessfull,
      errors: [],
    };

    try {
      const data = this.parserService.parseFile(
        ['id', 'email', 'firstname', 'lastname', 'index', 'year'],
        file,
      );
      for (let i = 0; i < data.length; i++) {
        if (data[i] && data[i].id != undefined) {
          const dataId = Number(data[i].id);
          if (Number.isNaN(dataId)) {
            uploadResult.errors.push(
              `${CsvParseUserErrorConstants.IdentifierNotValid} at position [${i}].`,
            );
          } else {
            const user: UserEntity = {
              id: dataId,
              email: data[i].email,
              firstname: data[i].firstname,
              lastname: data[i].lastname,
              index: data[i].index,
              year: data[i].year,
              role: RoleEnum.student,
            };

            if (data[i].id == 0) {
              const createResult = await this.createUser(user);
              if (createResult.id === -1) {
                uploadResult.errors.push(
                  `${CsvParseUserErrorConstants.UserNotCreated} at position [${i}]. Message ${createResult.errorMessage}`,
                );
              }
            } else {
              const updateResult = await this.updateUser(user);
              if (updateResult.id === -1) {
                uploadResult.errors.push(
                  `${CsvParseUserErrorConstants.UserNotUpdated} at position [${i}]. Message ${updateResult.errorMessage}`,
                );
              }
            }
          }
        } else {
          uploadResult.errors.push(
            `${CsvParseUserErrorConstants.UserDataNotValid} at position [${i}].`,
          );
        }
      }

      uploadResult.result =
        uploadResult.errors.length == 0
          ? CsvParseResult.successfull
          : CsvParseResult.unsucessfull;
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );
      uploadResult.errors.push(
        `${CsvParseUserErrorConstants.UserDataNotValid}: ${error}`,
      );
    }

    return uploadResult;
  }

  async getByIds(ids: number[]): Promise<UserEntity[]> {
    let result: UserEntity[] = [];
    try {
      result = await this.userRepository.getByIds(ids);
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async getAdmin(userEntity: UserEntity): Promise<UserEntity> {
    return await this.getByUserEmail(userEntity);
  }

  async getProfessor(userEntity: UserEntity): Promise<UserEntity> {
    return await this.getByUserEmail(userEntity);
  }

  async getStudent(userEntity: UserEntity): Promise<UserEntity> {
    let result: UserEntity | PromiseLike<UserEntity>;
    try {
      if (userEntity.email && userEntity.index && userEntity.year) {
        result = await this.userRepository.getByEmailOrIndex(
          userEntity.email,
          userEntity.index,
          userEntity.year,
        );
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async checkIfUserExist(userEntity: UserEntity): Promise<boolean> {
    let userInDb: UserEntity = null;
    if (userEntity.role === RoleEnum.student) {
      userInDb = await this.getStudent(userEntity);
    } else if (userEntity.role === RoleEnum.professor) {
      userInDb = await this.getProfessor(userEntity);
    } else if (userEntity.role === RoleEnum.admin) {
      userInDb = await this.getAdmin(userEntity);
    }

    return this.isFound(userInDb);
  }

  async getByIdWithHash(id: number): Promise<UserEntity> {
    return this.userRepository.getByIdWithHash(id);
  }

  async updateUserPassword(
    request: UpdateUserPasswordRequestDto,
  ): Promise<UpdateUserPasswordResponseDto> {
    const result = new UpdateUserPasswordResponseDto();
    try {
      if (request) {
        if (request.newPassword !== request.repeatPassword) {
          result.errorMessage =
            ErrorMessageConstants.NewAndRepeatedPasswordsNotValid;
          return result;
        }

        const userInDb = await this.getByIdWithHash(request.id);
        if (!this.isFound(userInDb) || !userInDb.hash) {
          result.errorMessage = ErrorMessageConstants.UserDoesntExists;
          return result;
        }

        const bcryptResult = await this.bcryptService.checkPasswordHash(
          request.currentPassword,
          userInDb.hash,
        );

        if (!bcryptResult) {
          result.errorMessage = ErrorMessageConstants.PasswordNotValid;
          return result;
        }

        const hashedPassword: any = await this.bcryptService.createUserPassword(
          request.newPassword,
          request.repeatPassword,
        );

        if (hashedPassword) {
          userInDb.hash = hashedPassword;

          await this.createOrUpdate(userInDb);
          result.id = userInDb.id;
        }
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );

      result.errorMessage = ErrorMessageConstants.InternalError;
    }

    return result;
  }

  async sendPasswordResetEmail(
    request: SendPasswordResetEmailRequestDto,
  ): Promise<SendPasswordResetEmailResponseDto> {
    const result = new SendPasswordResetEmailResponseDto();
    try {
      if (request && request.email) {
        const userInDb = await this.getByEmail(request.email);
        const resetPasswordInDb = await this.generateAndSendResetPasswordEmail(
          userInDb,
        );

        if (resetPasswordInDb && resetPasswordInDb.id) {
          result.id = resetPasswordInDb.id;
        }
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  async resetPassword(
    request: ResetPasswordRequestDto,
  ): Promise<ResetPasswordResponseDto> {
    const result = new ResetPasswordResponseDto();
    try {
      if (request) {
        const resetPassword =
          await this.resetPasswordUseCases.getLatestResetPasswordByUserId(
            request.userId,
            request.code,
          );
        if (this.resetPasswordUseCases.isFound(resetPassword)) {
          const timeToRegister: number = this.config.get('REG_DURATION') ?? 60;
          const expirationDate: Date = new Date(
            resetPassword.sentOn.setMinutes(
              resetPassword.sentOn.getMinutes() + timeToRegister,
            ),
          );
          const currentDate: Date = new Date(Date.now());

          if (currentDate <= expirationDate) {
            const userInDb = await this.getById(request.userId);
            if (this.isFound(userInDb) && userInDb.isActivated) {
              const hashedPassword: any =
                await this.bcryptService.createUserPassword(
                  request.password,
                  request.repeatedPassword,
                );

              if (hashedPassword) {
                userInDb.hash = hashedPassword;

                const createOrUpdateResult = await this.createOrUpdate(
                  userInDb,
                );
                result.id = createOrUpdateResult.id;
              }
            }
          }
        }
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.PostMethodError,
        error?.message,
        error?.stack,
      );

      result.errorMessage = ErrorMessageConstants.InternalError;
    }

    return result;
  }

  async getUserData(id: number): Promise<GetUserDataDto> {
    let result: GetUserDataDto = undefined;
    try {
      const userInDb = await this.getById(id);
      if (this.isFound(userInDb)) {
        result = {
          firstname: userInDb.firstname,
          lastname: userInDb.lastname,
        };
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.GetMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  //#endregion

  //#region Private methods

  private async generateAndSendEmailVerificationCode(userEntity: UserEntity) {
    if (this.isFound(userEntity) && !userEntity.isActivated) {
      const code = Encoding.generateRandomPassword();

      // TODO: Remove comment for PROD
      // await this.mailService.sendRegistrationMail(userEntity.id, userEntity.email, userEntity.firstname, code);

      await this.emailVerificationUseCases.invalidPreviousEmailValidation(
        userEntity.email,
      );
      await this.emailVerificationUseCases.createValidation(
        userEntity.id,
        userEntity.email,
        code,
      );
    }
  }

  private async generateAndSendResetPasswordEmail(
    userEntity: UserEntity,
  ): Promise<ResetPasswordEntity> {
    if (this.isFound(userEntity) && userEntity.isActivated) {
      const code = Encoding.generateRandomPassword();

      // TODO: Remove comment for PROD
      await this.mailService.sendResetPasswordMail(
        userEntity.id,
        userEntity.email,
        userEntity.firstname,
        code,
      );

      await this.resetPasswordUseCases.invalidPreviousResetPassword(
        userEntity.email,
      );
      return await this.resetPasswordUseCases.createResetPassword(
        userEntity.id,
        userEntity.email,
        code,
      );
    } else {
      return undefined;
    }
  }

  private isEmailPatternValid(email: string): boolean {
    const emailRegex = new RegExp(RegexPattern.Email);
    return email.match(emailRegex) != null;
  }

  //#endregion
}
