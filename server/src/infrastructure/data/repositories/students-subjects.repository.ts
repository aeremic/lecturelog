import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsSubjectsRepositoryAbstract } from 'src/core/abstracts/repositories/students-subjects.repository.abstract';
import { StudentsSubjects } from '../models';
import { StudentsSubjectsEntity } from 'src/core/entities/students-subjects.entity';
import { StudentsSubjectsMapper } from '../mappers/students-subjects.mapper';

export class StudentsSubjectsRepository
  implements StudentsSubjectsRepositoryAbstract
{
  @InjectRepository(StudentsSubjects)
  private readonly studentsSubjectsRepository: Repository<StudentsSubjects>;

  //#region Implementation of Generic repository

  async get(): Promise<StudentsSubjectsEntity[]> {
    const result = await this.studentsSubjectsRepository.find();

    return StudentsSubjectsMapper.ToEntities(result);
  }

  async getById(id: number): Promise<StudentsSubjectsEntity> {
    const result = await this.studentsSubjectsRepository.findOneBy({ id: id });

    return StudentsSubjectsMapper.ToEntity(result);
  }

  async createOrUpdate(
    studentsSubjectsEntity: StudentsSubjectsEntity,
  ): Promise<StudentsSubjectsEntity> {
    const studentsSubjectsModel: StudentsSubjects =
      StudentsSubjectsMapper.ToModel(studentsSubjectsEntity);
    const result = await this.studentsSubjectsRepository.save(
      studentsSubjectsModel,
    );

    return StudentsSubjectsMapper.ToEntity(result);
  }

  async delete(id: number): Promise<number> {
    const result = await this.studentsSubjectsRepository.delete({ id: id });

    return result.affected;
  }

  //#endregion

  async getBySubjectIdAndStudentId(subjectId: number, studentId: number) {
    const result = await this.studentsSubjectsRepository.findOne({
      where: { subjectId: subjectId, studentId: studentId },
    });

    return StudentsSubjectsMapper.ToEntity(result);
  }
}
