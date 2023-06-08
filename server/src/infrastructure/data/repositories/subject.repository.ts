import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SubjectEntity } from "src/core/entities";
import { SubjectRepositoryAbstract } from "src/core/abstracts/repositories/subject.repository.abstract";
import { Subject } from "../models";
import { SubjectMapper } from "../mappers/subject.mapper";

export class SubjectRepository implements SubjectRepositoryAbstract {
    @InjectRepository(Subject)
    private readonly subjectModelRepository: Repository<Subject>

    //#region Implementation of Generic repository   

    async get(): Promise<SubjectEntity[]> {
        let result = await this.subjectModelRepository.find();

        return SubjectMapper.ToEntities(result);
    }

    async getById(id: number): Promise<SubjectEntity> {
        let result = await this.subjectModelRepository.findOneBy({ id: id })

        return SubjectMapper.ToEntity(result);
    }

    async createOrUpdate(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
        let subjectModel: Subject = SubjectMapper.ToModel(subjectEntity);
        let result = await this.subjectModelRepository.save(subjectModel);

        return SubjectMapper.ToEntity(result);
    }

    async delete(id: number): Promise<number> {
        let result = await this.subjectModelRepository.delete({ id: id });

        return result.affected;
    }

    //#endregion

    async getSubjects(size: number, skip: number): Promise<SubjectEntity[]> {
        let result = await this.subjectModelRepository.find({
            take: size,
            skip: skip
        });

        return SubjectMapper.ToEntities(result);
    }

    async getSubjectsCount(): Promise<number> {
        let result = await this.subjectModelRepository.count();

        return result;
    }
}