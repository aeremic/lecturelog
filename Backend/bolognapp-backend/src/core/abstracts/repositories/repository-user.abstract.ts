import { UserEntity } from "src/core/entities";
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserRepositoryAbstract {
    // abstract getUserByFirstname(firstname: string): Promise<UserEntity>;
    
    abstract get(): UserEntity[];

    abstract getUserById(id: number): Promise<UserEntity>;
}