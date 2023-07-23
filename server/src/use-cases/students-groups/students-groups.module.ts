import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsSubjectGroups } from 'src/infrastructure/data/models';
import { StudentsGroupsRepositoryAbstract } from 'src/core/abstracts/repositories/students-groups.repository.abstract';
import { StudentsGroupsUseCases } from './students-groups.use-case';
import { StudentsGroupsRepository } from 'src/infrastructure/data/repositories/students-groups.repository';
import { LoggerModule } from '../logger/logger.module';

@Module({
    imports: [LoggerModule, TypeOrmModule.forFeature([StudentsSubjectGroups])],
    providers: [
        StudentsGroupsUseCases,
        {
            provide: StudentsGroupsRepositoryAbstract,
            useClass: StudentsGroupsRepository
        }
    ],
    exports: [StudentsGroupsUseCases]
})
export class StudentsGroupsModule { }