import { UserEntity } from "src/core/entities";
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class UserRepositoryAbstract { 
    //#region Base repository   
    
    abstract get(): Promise<UserEntity[]>;

    abstract getById(id: number): Promise<UserEntity>;

    abstract createOrUpdate(userEntity: UserEntity): Promise<UserEntity>;

    abstract delete(id: number): Promise<number>;

    //#endregion

    abstract getUserByFirstname(firstname: string): Promise<UserEntity>;
}