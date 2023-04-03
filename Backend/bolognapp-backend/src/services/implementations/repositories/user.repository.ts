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

    async getUserByFirstname(firstname: string): Promise<UserEntity> {
        let result = await this.userModelRepository.findOneBy({ firstname: firstname });
        
        return UserMapper.ToEntity(result);
    }

    async get(): Promise<UserEntity[]> {
        let result = await this.userModelRepository.find();

        return UserMapper.ToEntities(result);
    }

    async getById(id: number): Promise<UserEntity> {
        let result = await this.userModelRepository.findOneBy({ id: id })

        return UserMapper.ToEntity(result);
    }

    async create(userEntity: UserEntity): Promise<UserEntity> {
        let userModel: User = UserMapper.ToModel(userEntity);
        let result = await this.userModelRepository.save(userModel);

        return UserMapper.ToEntity(result);
    }
}