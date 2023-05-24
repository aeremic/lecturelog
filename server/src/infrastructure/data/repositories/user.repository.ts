import { UserRepositoryAbstract } from "src/core/abstracts/repositories/user.repository.abstract";
import { UserEntity } from "src/core/entities";
import { Repository } from "typeorm";
import { UserMapper } from "../mappers/user.mapper";
import { User } from '../models/user.model';
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEnum } from "src/core/common/enums/role.enum";

export class UserRepository implements UserRepositoryAbstract {
    @InjectRepository(User)
    private readonly userModelRepository: Repository<User>

    //#region Implementation of Base repository   

    async get(): Promise<UserEntity[]> {
        let result = await this.userModelRepository.find();

        return UserMapper.ToEntities(result);
    }

    async getById(id: number): Promise<UserEntity> {
        let result = await this.userModelRepository.findOneBy({ id: id })

        return UserMapper.ToEntity(result);
    }

    async createOrUpdate(userEntity: UserEntity): Promise<UserEntity> {
        let userModel: User = UserMapper.ToModel(userEntity);
        let result = await this.userModelRepository.save(userModel);

        return UserMapper.ToEntity(result);
    }

    async delete(id: number): Promise<number> {
        let result = await this.userModelRepository.delete({ id: id });

        return result.affected;
    }

    //#endregion

    async getByFirstname(firstname: string): Promise<UserEntity> {
        let result = await this.userModelRepository.findOneBy({ firstname: firstname });

        return UserMapper.ToEntity(result);
    }

    async getByEmail(email: string): Promise<UserEntity> {
        let result = await this.userModelRepository.findOneBy({ email: email });

        return UserMapper.ToEntity(result);
    }

    async getProfessors(): Promise<UserEntity[]> {
        let result = await this.userModelRepository.findBy({ role: UserMapper.getType(RoleEnum.professor) });

        return UserMapper.ToEntities(result);
    }

    async getStudents(): Promise<UserEntity[]> {
        let result = await this.userModelRepository.findBy({ role: UserMapper.getType(RoleEnum.student) });

        return UserMapper.ToEntities(result);
    }
}