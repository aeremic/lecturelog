import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsSubjects, StudentsSubjects, Subject } from 'src/infrastructure/data/models';
import { SubjectUseCases } from './subject.use-case';
import { SubjectController } from 'src/controllers/subject.controller';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectRepository } from 'src/infrastructure/data/repositories/subject.repository';
import { LoggerModule } from '../logger/logger.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule, LoggerModule, TypeOrmModule.forFeature([Subject, StudentsSubjects, ProfessorsSubjects])],
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