import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserEntity } from 'src/core/entities/user.entity';

@Injectable()
export class UserUseCases {
    @Inject(UserRepositoryAbstract)
    private userRepository: UserRepositoryAbstract

    get(): UserEntity[] {
        return this.userRepository.get();
    }

    getUserById(id: number): Promise<UserEntity> {
        return this.userRepository.getUserById(id);
    }

    // getUserByFirstname(firstname: string): Promise<UserEntity> {
    //     return this.dataServiceUser.getUserByFirstname(firstname);
    // }
}