import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfessorsSubjectGroups } from "../models";
import { ProfessorsSubjectGroupsEntity } from "src/core/entities";
import { ProfessorsGroupsRepositoryAbstract } from "src/core/abstracts/repositories/professors-groups.repository.abstract";
import { ProfessorsSubjectGroupsMapper } from "../mappers/professors-subjectgroups.mapper";

export class ProfessorsGroupsRepository implements ProfessorsGroupsRepositoryAbstract {
    @InjectRepository(ProfessorsSubjectGroups)
    private readonly professorsGroupsRepository: Repository<ProfessorsSubjectGroups>

    //#region Implementation of Generic repository   

    async get(): Promise<ProfessorsSubjectGroupsEntity[]> {
        let result = await this.professorsGroupsRepository.find();

        return ProfessorsSubjectGroupsMapper.ToEntities(result);
    }

    async getById(id: number): Promise<ProfessorsSubjectGroupsEntity> {
        let result = await this.professorsGroupsRepository.findOneBy({ id: id })

        return ProfessorsSubjectGroupsMapper.ToEntity(result);
    }

    async createOrUpdate(professorsSubjectGroupsEntity: ProfessorsSubjectGroupsEntity): Promise<ProfessorsSubjectGroupsEntity> {
        let professorsSubjectGroupsModel: ProfessorsSubjectGroups = ProfessorsSubjectGroupsMapper.ToModel(professorsSubjectGroupsEntity);
        let result = await this.professorsGroupsRepository.save(professorsSubjectGroupsModel);

        return ProfessorsSubjectGroupsMapper.ToEntity(result);
    }

    async delete(id: number): Promise<number> {
        let result = await this.professorsGroupsRepository.delete({ id: id });

        return result.affected;
    }

    //#endregion
}