import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserEntity } from 'src/core/entities/user.entity';
import { GenericUseCases } from '../generic.use-case';
import { LoggerUseCases } from '../logger/logger.use-case';
import { ErrorConstants } from 'src/core/common/constants/error.constant';
import { ProfessorsDto } from 'src/core/dtos/professors.dto';
import { MailService } from 'src/services';
import { Encoding } from 'src/core/common/encoding';
import { EmailVerificationUseCases } from '../emailverification/emailverification.use-case';
import { EmailVerificationEntity } from 'src/core/entities';

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

    async get(): Promise<UserEntity[]> {
        return super.get(this.userRepository, this.loggerUseCases);
    }

    async getById(id: number): Promise<UserEntity> {
        return super.getById(this.userRepository, this.loggerUseCases, id);
    }

    async createOrUpdate(userEntity: UserEntity): Promise<UserEntity> {
        // TODO: Return some type of response if user already exist with that email!
        let result: UserEntity | PromiseLike<UserEntity>;

        try {
            let userInDb = await this.getByEmail(userEntity.email);
            if (!this.isFound(userInDb) || !userInDb.isActivated) {

                userEntity.isActivated = false;
                result = await super.createOrUpdate(this.userRepository, this.loggerUseCases, userEntity);

                if (result && result.id != null) {
                    let code = Encoding.generateRandomPassword();

                    // TODO: Remove comment for PROD
                    await this.mailService.sendRegistrationMail(result.id, result.email, result.firstname, code);
                    await this.emailVerificationUseCases.createValidation(result.id, code);
                }
            }
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

    async getStudents(): Promise<UserEntity[]> {
        let result: UserEntity[] | PromiseLike<UserEntity[]>;
        try {
            result = await this.userRepository.getStudents();
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
        }

        return result;
    }
}