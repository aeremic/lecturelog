import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentsSubjectGroups } from "../models";
import { StudentsSubjectGroupsEntity } from "src/core/entities";
import { StudentsGroupsRepositoryAbstract } from "src/core/abstracts/repositories/students-groups.repository.abstract";
import { StudentsSubjectGroupsMapper } from "../mappers/students-subjectgroups.mapper";

export class StudentsGroupsRepository implements StudentsGroupsRepositoryAbstract {
    @InjectRepository(StudentsSubjectGroups)
    private readonly studentsGroupsRepository: Repository<StudentsSubjectGroups>

    //#region Implementation of Generic repository   

    async get(): Promise<StudentsSubjectGroupsEntity[]> {
        let result = await this.studentsGroupsRepository.find();

        return StudentsSubjectGroupsMapper.ToEntities(result);
    }

    async getById(id: number): Promise<StudentsSubjectGroupsEntity> {
        let result = await this.studentsGroupsRepository.findOneBy({ id: id })

        return StudentsSubjectGroupsMapper.ToEntity(result);
    }

    async createOrUpdate(studentsSubjectGroupsEntity: StudentsSubjectGroupsEntity): Promise<StudentsSubjectGroupsEntity> {
        let studentsSubjectGroupsModel: StudentsSubjectGroups = StudentsSubjectGroupsMapper.ToModel(studentsSubjectGroupsEntity);
        let result = await this.studentsGroupsRepository.save(studentsSubjectGroupsModel);

        return StudentsSubjectGroupsMapper.ToEntity(result);
    }

    async delete(id: number): Promise<number> {
        let result = await this.studentsGroupsRepository.delete({ id: id });

        return result.affected;
    }

    //#endregion
}