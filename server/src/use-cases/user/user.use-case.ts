import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserEntity } from 'src/core/entities/user.entity';
import { GenericUseCases } from '../generic.use-case';
import { LoggerUseCases } from '../logger/logger.use-case';
import { ErrorConstants } from 'src/core/common/constants/error.constant';

@Injectable()
export class UserUseCases extends GenericUseCases<UserEntity>{
    @Inject(UserRepositoryAbstract)
    private userRepository: UserRepositoryAbstract

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    async get(): Promise<UserEntity[]> {
        return super.get(this.userRepository, this.loggerUseCases);
    }

    async getById(id: number): Promise<UserEntity> {
        return super.getById(this.userRepository, this.loggerUseCases, id);
    }

    async create(userEntity: UserEntity): Promise<UserEntity> {
        return super.create(this.userRepository, this.loggerUseCases, userEntity);
    }

    async update(userEntity: UserEntity): Promise<UserEntity> {
        return super.update(this.userRepository, this.loggerUseCases, userEntity);
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

    async getProfessors(): Promise<UserEntity[]> {
        let result: UserEntity[] | PromiseLike<UserEntity[]>;
        try {
            result = await this.userRepository.getProfessors();
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