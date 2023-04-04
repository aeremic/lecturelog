import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { LoginDto } from 'src/core/dtos';
import { UserEntity } from 'src/core/entities/user.entity';
import { AuthService } from 'src/services';

@Injectable()
export class UserUseCases {
    @Inject(UserRepositoryAbstract)
    private userRepository: UserRepositoryAbstract

    @Inject(AuthService)
    private authService: AuthService;

    async get(): Promise<UserEntity[]> {
        return await this.userRepository.get();
    }

    async getById(id: number): Promise<UserEntity> {
        return await this.userRepository.getById(id);
    }

    async create(userEntity: UserEntity): Promise<UserEntity> {
        if (userEntity) {
            return await this.userRepository.createOrUpdate(userEntity);
        }

        return null;
    }

    async update(userEntity: UserEntity): Promise<UserEntity> {
        if (userEntity) {
            return await this.userRepository.createOrUpdate(userEntity);
        }

        return null;
    }

    async delete(id: number): Promise<number> {
        return await this.userRepository.delete(id);
    }

    async getUserByFirstname(firstname: string): Promise<UserEntity> {
        if (firstname) {
            return await this.userRepository.getUserByFirstname(firstname);
        }

        return null;
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        if (email) {
            return await this.userRepository.getUserByEmail(email);
        }

        return null;
    }

    async login(loginDto: LoginDto): Promise<any> {
        this.getUserByEmail(loginDto?.email).then((res) => {
            return this.authService.login(loginDto, res);
        });
    }
}