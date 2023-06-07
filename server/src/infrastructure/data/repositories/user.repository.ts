import { UserRepositoryAbstract } from "src/core/abstracts/repositories/user.repository.abstract";
import { UserEntity } from "src/core/entities";
import { Like, Repository } from "typeorm";
import { UserMapper } from "../mappers/user.mapper";
import { User } from '../models/user.model';
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEnum } from "src/core/common/enums/role.enum";

export class UserRepository implements UserRepositoryAbstract {
    @InjectRepository(User)
    private readonly userModelRepository: Repository<User>

    //#region Implementation of Generic repository   

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

    async getActivatedByEmail(email: string): Promise<UserEntity> {
        let result = await this.userModelRepository.findOneBy({
            email: email, isActivated: true
        });

        return UserMapper.ToEntity(result);
    }

    async getActivatedByEmailOrIndex(email: string, index: number, year: number): Promise<UserEntity> {
        let result = await this.userModelRepository.findOne({
            where: [{ email: email, isActivated: true }, { index: index, year: year, isActivated: true }],
        });

        return UserMapper.ToEntity(result);
    }

    async getProfessors(size: number, skip: number): Promise<UserEntity[]> {
        let result = await this.userModelRepository.find({
            where: { isActivated: true, role: UserMapper.getType(RoleEnum.professor) }, order: { email: "ASC" },
            take: size,
            skip: skip
        });

        return UserMapper.ToEntities(result);
    }

    async getProfessorsCount(): Promise<number> {
        let result = await this.userModelRepository.count({
            where: { isActivated: true, role: UserMapper.getType(RoleEnum.professor) }
        })

        return result;
    }

    async getStudents(size: number, skip: number): Promise<UserEntity[]> {
        let result = await this.userModelRepository.find({
            where: { isActivated: true, role: UserMapper.getType(RoleEnum.student) }, order: { email: "ASC" },
            take: size,
            skip: skip
        });

        return UserMapper.ToEntities(result);
    }

    async getStudentsCount(): Promise<number> {
        let result = await this.userModelRepository.count({
            where: { isActivated: true, role: UserMapper.getType(RoleEnum.student) }
        })

        return result;
    }
}