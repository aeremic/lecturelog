import { UserRepositoryAbstract } from "src/core/abstracts/repositories/user.repository.abstract";
import { UserEntity } from "src/core/entities";
import { Repository } from "typeorm";
import { UserMapper } from "../mappers/user.mapper";
import { User } from '../models/user.model';
import { BadGatewayException } from '@nestjs/common';
import { rejects } from "assert";
import { resolve } from "path";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository implements UserRepositoryAbstract {
    @InjectRepository(User)
    private readonly userModelRepository: Repository<User>
    // db implementation calls

    // getUserByFirstname(firstname: string): Promise<UserEntity> {
    //     return this.userModelRepository.
    // }

    get(): UserEntity[] {
        // new Promise<User[]>((resolve, reject) => {
        //     this.userModelRepository.find()
        //         .then((res) => {
        //             resolve(res);
        //         })
        //         .catch(err => reject(err));
        // })
        //     .then((res) => { return UserMapper.ToEntities(res); })
        //     .catch((err) => {
        //         throw new BadGatewayException(err);
        //     });

        return null;
    }

    getUserById(id: number): Promise<UserEntity> {
        return this.userModelRepository.findOneById(id)
            .then(res => {
                return UserMapper.ToEntity(res);
            });
    }
}