import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserEntity } from 'src/core/entities/user.entity';
import { GenericUseCases } from '../generic.use-case';

@Injectable()
export class UserUseCases extends GenericUseCases<UserEntity>{
    @Inject(UserRepositoryAbstract)
    private userRepository: UserRepositoryAbstract

    async get(): Promise<UserEntity[]> {
        return super.get(this.userRepository);
    }

    async getById(id: number): Promise<UserEntity> {
        return super.getById(this.userRepository, id);
    }

    async create(userEntity: UserEntity): Promise<UserEntity> {
        return super.create(this.userRepository, userEntity);  
    }

    async update(userEntity: UserEntity): Promise<UserEntity> {
        return super.update(this.userRepository, userEntity);
    }

    async delete(id: number): Promise<number> {
        return super.delete(this.userRepository, id);
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
}