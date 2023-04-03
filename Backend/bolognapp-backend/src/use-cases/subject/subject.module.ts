import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsSubjects, Subject } from 'src/services/implementations/models';
import { SubjectUseCases } from './subject.use-case';
import { SubjectController } from 'src/controllers/subject.controller';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectRepository } from 'src/services/implementations/repositories/subject.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Subject, StudentsSubjects])],
    providers: [
        SubjectUseCases,
        {
            provide: SubjectRepositoryAbstract,
            useClass: SubjectRepository
        }
    ],
    controllers: [SubjectController]
})
export class SubjectModule { }