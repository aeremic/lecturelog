import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserEntity } from 'src/core/entities/user.entity';
import { GenericUseCases } from '../generic.use-case';
import { LoggerUseCases } from '../logger/logger.use-case';
import { ErrorConstants, ErrorMessageConstants } from 'src/core/common/constants/error.constant';
import { ProfessorsDto } from 'src/core/dtos/responses/professors.dto';
import { BcryptService, MailService } from 'src/services';
import { Encoding } from 'src/core/common/encoding';
import { EmailVerificationUseCases } from '../emailverification/email-verification.use-case';
import { EmailVerificationEntity } from 'src/core/entities';
import { EmailRegistrationDto } from 'src/core/dtos';
import { ConfigService } from '@nestjs/config';
import { StudentsDto } from 'src/core/dtos/responses/students.dto';
import { RoleEnum } from 'src/core/common/enums/role.enum';
import { AllUsersExceptAdminDto } from 'src/core/dtos/responses/all-users-except-admin.dto';
import { AssignedSubjectDto } from 'src/core/dtos/responses/assigned-group.dto';
import { SubjectUseCases } from '../subject/subject.use-case';
import { CodeEnum } from 'src/core/common/enums/code,enum';
import { LectureUseCases } from '../lecture/lecture.use-case';
import { AvailableGroupDto } from 'src/core/dtos/responses/available-group.dto';
import { ActiveLectureEntity } from 'src/core/entities/active-lecture.entity';
import { SendEmailVerificationDto } from '../../core/dtos/requests/send-email-verification.dto';
import { CreateStudentRequestDto } from '../../core/dtos/requests/create-student-request.dto';
import { CreateUserResponseDto } from 'src/core/dtos/responses/create-user-response.dto';

@Injectable()
export class UserUseCases extends GenericUseCases<UserEntity>{
    @Inject(UserRepositoryAbstract)
    private userRepository: UserRepositoryAbstract;

    @Inject(SubjectUseCases)
    private subjectUseCases: SubjectUseCases;

    @Inject(EmailVerificationUseCases)
    private emailVerificationUseCases: EmailVerificationUseCases;

    @Inject(LectureUseCases)
    private lectureUseCases: LectureUseCases;

    @Inject(MailService)
    private mailService: MailService;

    @Inject(BcryptService)
    private bcryptService: BcryptService;

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    @Inject()
    private readonly config: ConfigService;

    async get(): Promise<UserEntity[]> {
        return super.get(this.userRepository, this.loggerUseCases);
    }

    async getById(id: number): Promise<UserEntity> {
        return super.getById(this.userRepository, this.loggerUseCases, id);
    }

    async createOrUpdate(userEntity: UserEntity): Promise<UserEntity> {
        let result: UserEntity | PromiseLike<UserEntity>;
        try {
            result = await super.createOrUpdate(this.userRepository, this.loggerUseCases, userEntity);
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
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
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async getByEmail(email: string): Promise<UserEntity> {
        let result: UserEntity | PromiseLike<UserEntity>;
        try {
            if (email) {
                result = await this.userRepository.getByEmail(email);
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async getByUserEmail(userEntity: UserEntity): Promise<UserEntity> {
        let result: UserEntity | PromiseLike<UserEntity>;
        try {
            if (userEntity.email) {
                result = await this.userRepository.getByEmail(userEntity.email);
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    getAdmin = async (userEntity: UserEntity): Promise<UserEntity> =>
        this.getByUserEmail(userEntity);

    getProfessor = async (userEntity: UserEntity): Promise<UserEntity> =>
        this.getByUserEmail(userEntity);

    getStudent = async (userEntity: UserEntity): Promise<UserEntity> => {
        let result: UserEntity | PromiseLike<UserEntity>;
        try {
            if (userEntity.email && userEntity.index && userEntity.year) {
                result = await this.userRepository.getByEmailOrIndex(userEntity.email, userEntity.index, userEntity.year);
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async getProfessors(page: number, size: number): Promise<ProfessorsDto> {
        let result: ProfessorsDto | PromiseLike<ProfessorsDto>;
        let professors: UserEntity[] | PromiseLike<UserEntity[]>;
        let totalProfessorsCount: number | PromiseLike<number>;
        let skip = page * size;

        try {
            professors = await this.userRepository.getProfessors(size, skip);
            totalProfessorsCount = await this.userRepository.getProfessorsCount();

            result = {
                professors: professors,
                count: totalProfessorsCount
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async getStudents(page: number, size: number): Promise<StudentsDto> {
        let result: StudentsDto | PromiseLike<StudentsDto>;
        let students: UserEntity[] | PromiseLike<UserEntity[]>;
        let totalStudentsCount: number | PromiseLike<number>;
        let skip = page * size;

        try {
            students = await this.userRepository.getStudents(size, skip);
            totalStudentsCount = await this.userRepository.getStudentsCount();

            result = {
                students: students,
                count: totalStudentsCount
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async getUser(userEntity: UserEntity, getUserFunc: (userEntity: UserEntity) => Promise<UserEntity>): Promise<UserEntity> {
        return await getUserFunc(userEntity);
    }

    async checkIfUserExist(userEntity: UserEntity): Promise<Boolean> {
        let userInDb: UserEntity = null;

        if (userEntity.role === RoleEnum.student) {
            userInDb = await this.getUser(userEntity, this.getStudent);
        } else if (userEntity.role === RoleEnum.professor) {
            userInDb = await this.getUser(userEntity, this.getProfessor);
        } else if (userEntity.role === RoleEnum.admin) {
            userInDb = await this.getUser(userEntity, this.getAdmin);
        }

        return this.isFound(userInDb);
    }

    async generateAndSendEmailVerificationCode(userEntity: UserEntity) {
        if (this.isFound(userEntity) && !userEntity.isActivated) {
            let code = Encoding.generateRandomPassword();

            // TODO: Remove comment for PROD
            // await this.mailService.sendRegistrationMail(userEntity.id, userEntity.email, userEntity.firstname, code);

            await this.emailVerificationUseCases.invalidPreviousEmailValidation(userEntity.email);
            await this.emailVerificationUseCases.createValidation(userEntity.id, userEntity.email, code);
        }
    }

    async createStudent(createStudentRequestDto: CreateStudentRequestDto): Promise<CreateUserResponseDto> {
        let user: UserEntity = {
            id: createStudentRequestDto.id,
            firstname: createStudentRequestDto.firstname,
            lastname: createStudentRequestDto.lastname,
            email: createStudentRequestDto.email,
            index: createStudentRequestDto.index,
            year: createStudentRequestDto.year,
            role: createStudentRequestDto.role,
            isActivated: false
        }

        return await this.createUser(user);
    }

    async createUser(userEntity: UserEntity): Promise<CreateUserResponseDto> {
        // TODO: Return some type of response if user already exist with that email!
        let result = new CreateUserResponseDto;

        try {
            if (!await this.checkIfUserExist(userEntity)) {
                let userInDb = await super.createOrUpdate(this.userRepository, this.loggerUseCases, userEntity);
                this.generateAndSendEmailVerificationCode(userInDb);

                result.id = userInDb.id;
            } else {
                result.errorMessage = ErrorMessageConstants.UserExists;
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async sendEmailVerification(sendEmailVerificationDto: SendEmailVerificationDto): Promise<boolean> {
        let result: boolean | PromiseLike<boolean> = false;

        try {
            let userInDb = await this.getById(sendEmailVerificationDto.userId);
            this.generateAndSendEmailVerificationCode(userInDb);

            result = true;
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.PostMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async emailRegistration(emailRegistrationDto: EmailRegistrationDto): Promise<boolean> {
        let result: boolean | PromiseLike<boolean> = false;
        try {
            let emailVerification = await this.emailVerificationUseCases.getLatestEmailVerificationByUserId(emailRegistrationDto.userId, emailRegistrationDto.code);
            if (this.emailVerificationUseCases.isFound(emailVerification)) {
                let timeToRegister: number = this.config.get('REG_DURATION') ?? 60;
                let expirationDate: Date = new Date(emailVerification.sentOn.setMinutes(emailVerification.sentOn.getMinutes() + timeToRegister));
                let currentDate: Date = new Date(Date.now());

                if (currentDate <= expirationDate) {
                    let userInDb = await this.getById(emailRegistrationDto.userId);
                    if (this.isFound(userInDb) && !userInDb.isActivated) {
                        let hashedPassword: any = await this.bcryptService.createUserPassword(emailRegistrationDto.password, emailRegistrationDto.repeatedPassword);

                        if (hashedPassword) {
                            userInDb.isActivated = true;
                            userInDb.hash = hashedPassword;

                            await this.createOrUpdate(userInDb);
                            result = true;
                        }
                    }
                }
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.PostMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async getAllExceptAdmin(): Promise<AllUsersExceptAdminDto> {
        let result: AllUsersExceptAdminDto | PromiseLike<AllUsersExceptAdminDto>;
        try {
            let users = await this.userRepository.getAllExceptAdmin();
            result = {
                professors: users.filter(u => u.role == RoleEnum.professor),
                students: users.filter(u => u.role == RoleEnum.student)
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async getProfessorAssignedSubjects(id: number): Promise<AssignedSubjectDto[]> {
        let result: AssignedSubjectDto[];
        try {
            let subjects = await this.subjectUseCases.getSubjectsByProfessorId(id);
            if (subjects) {
                result = [];
                subjects.forEach(subject => {
                    if (subject) {
                        result.push({ subjectId: subject.id, name: subject.name, userId: -1 });
                    }
                });

                if (result.length) {
                    let activeSubjectRooms = await this.subjectUseCases.getActiveSubjects();
                    if (activeSubjectRooms) {
                        result = result
                            .filter(element => !activeSubjectRooms
                                .map(function (item) {
                                    if (item && item.subjectId > -1) {
                                        return item.subjectId;
                                    }
                                }).includes(element.subjectId));
                    }
                }
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    // TODO: Refactor below method to reduce number of array iterations!
    async getProfessorActiveAssignedSubjects(id: number): Promise<AssignedSubjectDto[]> {
        let result: AssignedSubjectDto[];
        try {
            let subjects = await this.subjectUseCases.getSubjectsByProfessorId(id);
            if (subjects) {
                result = [];
                subjects.forEach(subject => {
                    if (subject) {
                        result.push({ subjectId: subject.id, name: subject.name, userId: -1 });
                    }
                });

                if (result.length) {
                    let activeSubjectRooms = await this.subjectUseCases.getActiveSubjects();
                    if (activeSubjectRooms) {
                        result = result
                            .filter(element => activeSubjectRooms
                                .map(function (activeGroup) {
                                    if (activeGroup && activeGroup.subjectId > -1) {
                                        return activeGroup.subjectId;
                                    }
                                }).includes(element.subjectId));

                        result.forEach(group => {
                            activeSubjectRooms.forEach(activeGroup => {
                                if (activeGroup && activeGroup.subjectId > -1 && activeGroup.subjectId === group.subjectId && activeGroup.userId === id) {
                                    group.userId = id
                                }
                            })
                        })
                    }
                }
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async getStudentAvailableSubjects(id: number): Promise<AvailableGroupDto[]> {
        let result: AvailableGroupDto[];
        try {
            let subjects = await this.subjectUseCases.getSubjectsByStudentId(id);
            if (subjects) {
                result = [];
                subjects.forEach(subject => {
                    if (subject) {
                        result.push({ subjectId: subject.id, name: subject.name });
                    }
                });

                if (result.length) {
                    let activeSubjectRooms = await this.subjectUseCases.getActiveSubjects();
                    if (activeSubjectRooms) {
                        result = result
                            .filter(element => activeSubjectRooms
                                .map(function (item) {
                                    if (item && item.subjectId > -1) {
                                        return item.subjectId;
                                    }
                                }).includes(element.subjectId));
                    }
                }
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async getCodeEventByActiveLecture(activeLecture: ActiveLectureEntity): Promise<CodeEnum> {
        return await this.lectureUseCases.getCodeEventByActiveLecture(activeLecture);
    }

    async getCodeByActiveLecture(activeLecture: ActiveLectureEntity): Promise<string> {
        return await this.lectureUseCases.getCodeByActiveLecture(activeLecture);
    }
}