import { UserEntity } from "src/core/entities";
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserRepositoryAbstract {
    abstract getUserByFirstname(firstname: string): Promise<UserEntity>;
    
    abstract get(): Promise<UserEntity[]>;

    abstract getById(id: number): Promise<UserEntity>;

    abstract create(userEntity: UserEntity): Promise<UserEntity>;
}