import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from 'src/core/entities';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { Subject } from '../models';
import { SubjectMapper } from '../mappers/subject.mapper';

export class SubjectRepository implements SubjectRepositoryAbstract {
  @InjectRepository(Subject)
  private readonly subjectModelRepository: Repository<Subject>;

  //#region Implementation of Generic repository

  async get(): Promise<SubjectEntity[]> {
    const result = await this.subjectModelRepository.find();

    return SubjectMapper.ToEntities(result);
  }

  async getById(id: number): Promise<SubjectEntity> {
    const result = await this.subjectModelRepository.findOneBy({ id: id });

    return SubjectMapper.ToEntity(result);
  }

  async createOrUpdate(subjectEntity: SubjectEntity): Promise<SubjectEntity> {
    const subjectModel: Subject = SubjectMapper.ToModel(subjectEntity);
    const result = await this.subjectModelRepository.save(subjectModel);

    return SubjectMapper.ToEntity(result);
  }

  async delete(id: number): Promise<number> {
    const result = await this.subjectModelRepository.delete({ id: id });

    return result.affected;
  }

  //#endregion

  async getSubjects(size: number, skip: number): Promise<SubjectEntity[]> {
    const result = await this.subjectModelRepository.find({
      take: size,
      skip: skip,
    });

    return SubjectMapper.ToEntities(result);
  }

  async getSubjectsCount(): Promise<number> {
    const result = await this.subjectModelRepository.count();

    return result;
  }

  async getSubject(id: number): Promise<SubjectEntity> {
    const result = await this.subjectModelRepository
      .createQueryBuilder('subject')
      .innerJoinAndSelect('subject.professor', 'professor')
      .innerJoinAndSelect('professor', 'user1')
      .leftJoinAndSelect('subject.studentsSubjects', 'studentsSubjects')
      .leftJoinAndSelect('studentsSubjects.student', 'user2')
      .where('subject.id = :id', { id: id })
      .printSql()
      .getOne();

    return SubjectMapper.ToEntity({
      id: result.id,
      name: result.name,
      pointsPerPresence: result.pointsPerPresence,
      professor: result.professor,
      studentsSubjects: result.studentsSubjects,
    });
  }

  async getSubjectsByProfessorId(id: number): Promise<SubjectEntity[]> {
    const result = await this.subjectModelRepository
      .createQueryBuilder('subject')
      .innerJoinAndSelect('subject.professor', 'professor')
      .where('professor.id = :id', { id: id })
      .printSql()
      .getMany();

    return SubjectMapper.ToEntities(result);
  }

  async getSubjectsByStudentId(id: number): Promise<SubjectEntity[]> {
    const result = await this.subjectModelRepository
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.studentsSubjects', 'studentsSubjects')
      .innerJoinAndSelect('studentsSubjects.student', 'user')
      .where('user.id = :id', { id: id })
      .printSql()
      .getMany();

    return SubjectMapper.ToEntities(result);
  }
}
