import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserEntity } from 'src/core/entities/user.entity';

@Injectable()
export class UserUseCases {
    @Inject(UserRepositoryAbstract)
    private userRepository: UserRepositoryAbstract

    async get(): Promise<UserEntity[]> {
        let result: UserEntity[] | PromiseLike<UserEntity[]>;
        try {
            result = await this.userRepository.get();
        } catch (error) {
            // log error
        }

        return result;
    }

    async getById(id: number): Promise<UserEntity> {
        let result: UserEntity | PromiseLike<UserEntity>;
        try {
            result = await this.userRepository.getById(id);
        } catch (error) {
            // log error
        }

        return result;
    }

    async create(userEntity: UserEntity): Promise<UserEntity> {
        let result: UserEntity | PromiseLike<UserEntity>;
        try {
            if (userEntity) {
                result = await this.userRepository.createOrUpdate(userEntity);
            }
        } catch (error) {
            // log error
        }

        return result;
    }

    async update(userEntity: UserEntity): Promise<UserEntity> {
        let result: UserEntity | PromiseLike<UserEntity>;
        try {
            if (userEntity) {
                result = await this.userRepository.createOrUpdate(userEntity);
            }
        } catch (error) {
            // log error
        }

        return result;
    }

    async delete(id: number): Promise<number> {
        let result: number;
        try {
            result = await this.userRepository.delete(id);
        } catch (error) {
            // log error
        }

        return result;
    }

    async getByFirstname(firstname: string): Promise<UserEntity> {
        let result: UserEntity | PromiseLike<UserEntity>;
        try {
            if (firstname) {
                result = await this.userRepository.getByFirstname(firstname);
            }
        } catch (error) {
            // log error
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
            // log error
        }

        return result;
    }

    isFound(userEntity: UserEntity): Boolean{
        return userEntity && userEntity.id != undefined;
    }
}