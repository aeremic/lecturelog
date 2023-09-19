import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentsSubjectsRepositoryAbstract } from "src/core/abstracts/repositories/students-subjects.repository.abstract";
import { StudentsSubjects } from "../models";
import { StudentsSubjectsEntity } from "src/core/entities/students-subjects.entity";
import { StudentsSubjectsMapper } from "../mappers/students-subjects.mapper";

export class StudentsSubjectsRepository implements StudentsSubjectsRepositoryAbstract {
    @InjectRepository(StudentsSubjects)
    private readonly StudentsSubjectsRepository: Repository<StudentsSubjects>

    //#region Implementation of Generic repository   

    async get(): Promise<StudentsSubjectsEntity[]> {
        let result = await this.StudentsSubjectsRepository.find();

        return StudentsSubjectsMapper.ToEntities(result);
    }

    async getById(id: number): Promise<StudentsSubjectsEntity> {
        let result = await this.StudentsSubjectsRepository.findOneBy({ id: id })

        return StudentsSubjectsMapper.ToEntity(result);
    }

    async createOrUpdate(studentsSubjectsEntity: StudentsSubjectsEntity): Promise<StudentsSubjectsEntity> {
        let studentsSubjectsModel: StudentsSubjects = StudentsSubjectsMapper.ToModel(studentsSubjectsEntity);
        let result = await this.StudentsSubjectsRepository.save(studentsSubjectsModel);

        return StudentsSubjectsMapper.ToEntity(result);
    }

    async delete(id: number): Promise<number> {
        let result = await this.StudentsSubjectsRepository.delete({ id: id });

        return result.affected;
    }

    //#endregion
}