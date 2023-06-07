import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserEntity } from 'src/core/entities/user.entity';
import { GenericUseCases } from '../generic.use-case';
import { LoggerUseCases } from '../logger/logger.use-case';
import { ErrorConstants } from 'src/core/common/constants/error.constant';
import { ProfessorsDto } from 'src/core/dtos/responses/professors.dto';
import { BcryptService, MailService } from 'src/services';
import { Encoding } from 'src/core/common/encoding';
import { EmailVerificationUseCases } from '../emailverification/email-verification.use-case';
import { EmailVerificationEntity } from 'src/core/entities';
import { EmailRegistrationDto } from 'src/core/dtos';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth';
import { StudentsDto } from 'src/core/dtos/responses/students.dto';
import { RoleEnum } from 'src/core/common/enums/role.enum';

@Injectable()
export class UserUseCases extends GenericUseCases<UserEntity>{
    @Inject(UserRepositoryAbstract)
    private userRepository: UserRepositoryAbstract;

    @Inject(MailService)
    private mailService: MailService;

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    @Inject(EmailVerificationUseCases)
    private emailVerificationUseCases: EmailVerificationUseCases;

    @Inject(BcryptService)
    private bcryptService: BcryptService;

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

    async getActivatedByEmail(email: string): Promise<UserEntity> {
        let result: UserEntity | PromiseLike<UserEntity>;
        try {
            if (email) {
                result = await this.userRepository.getActivatedByEmail(email);
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }

    async getActivatedByEmailOrIndex(email: string, index?: number, year?: number): Promise<UserEntity> {
        let result: UserEntity | PromiseLike<UserEntity>;
        try {
            if (email && index && year) {
                result = await this.userRepository.getActivatedByEmailOrIndex(email, index, year);
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

    async createUser(userEntity: UserEntity): Promise<UserEntity> {
        // TODO: Return some type of response if user already exist with that email!
        let result: UserEntity | PromiseLike<UserEntity>;

        try {
            let activatedUserInDb: UserEntity = null;

            if (userEntity.role == RoleEnum.student) {
                activatedUserInDb = await this.getActivatedByEmailOrIndex(userEntity.email, userEntity.index, userEntity.year);
            } else {
                activatedUserInDb = await this.getActivatedByEmail(userEntity.email);
            }

            if (!this.isFound(activatedUserInDb)) {

                userEntity.isActivated = false;
                result = await super.createOrUpdate(this.userRepository, this.loggerUseCases, userEntity);

                if (this.isFound(result)) {
                    let code = Encoding.generateRandomPassword();

                    // TODO: Remove comment for PROD
                    // await this.mailService.sendRegistrationMail(result.id, result.email, result.firstname, code);

                    await this.emailVerificationUseCases.invalidPreviousEmailValidation(result.email);
                    await this.emailVerificationUseCases.createValidation(result.id, result.email, code);
                }
            }
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
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
}