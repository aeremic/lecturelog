import { Repository, createQueryBuilder, getRepository } from "typeorm";
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

    async getSubject(id: number): Promise<SubjectEntity> {
        let result = await this.subjectModelRepository.createQueryBuilder("subject")
            .leftJoinAndSelect("subject.subjectGroups", "subjectGroup")
            .leftJoinAndSelect("subjectGroup.studentsSubjectGroups", "studentsSubjectGroups")
            .leftJoinAndSelect("studentsSubjectGroups.student", "user1")
            .leftJoinAndSelect("subjectGroup.professorsSubjectGroups", "professorsSubjectGroups")
            .leftJoinAndSelect("professorsSubjectGroups.professor", "user2")
            .where("subject.id = :id", { id: id })
            .printSql()
            .getOne()


        return SubjectMapper.ToEntity({
            id: result.id,
            name: result.name,
            subjectGroups: result.subjectGroups
        });
    }

    async getSubjectsByProfessorId(id: number): Promise<SubjectEntity[]> {
        let result = await this.subjectModelRepository.createQueryBuilder("subject")
            .innerJoinAndSelect("subject.subjectGroups", "subjectGroup")
            .innerJoinAndSelect("subjectGroup.professorsSubjectGroups", "professorsSubjectGroups")
            .where("professorsSubjectGroups.professorId = :id", { id: id })
            .printSql()
            .getMany()

        return SubjectMapper.ToEntities(result);
    }
}