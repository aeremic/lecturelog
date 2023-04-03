import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserEntity } from 'src/core/entities/user.entity';

@Injectable()
export class UserUseCases {
    @Inject(UserRepositoryAbstract)
    private userRepository: UserRepositoryAbstract

    get(): Promise<UserEntity[]> {
        return this.userRepository.get();
    }

    getById(id: number): Promise<UserEntity> {
        return this.userRepository.getById(id);
    }

    create(userEntity: UserEntity): Promise<UserEntity> {
        return this.userRepository.createOrUpdate(userEntity);
    }

    update(userEntity: UserEntity): Promise<UserEntity> {
        return this.userRepository.createOrUpdate(userEntity);
    }

    delete(id: number): Promise<number> {
        return this.userRepository.delete(id);
    }

    getUserByFirstname(firstname: string): Promise<UserEntity> {
        return this.userRepository.getUserByFirstname(firstname);
    }
}