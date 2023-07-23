import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsSubjectGroups } from 'src/infrastructure/data/models';
import { ProfessorsGroupsRepositoryAbstract } from 'src/core/abstracts/repositories/professors-groups.repository.abstract';
import { ProfessorsGroupsUseCases } from './professors-groups.use-case';
import { ProfessorsGroupsRepository } from 'src/infrastructure/data/repositories/professors-groups.repository';
import { LoggerModule } from '../logger/logger.module';

@Module({
    imports: [LoggerModule, TypeOrmModule.forFeature([ProfessorsSubjectGroups])],
    providers: [
        ProfessorsGroupsUseCases,
        {
            provide: ProfessorsGroupsRepositoryAbstract,
            useClass: ProfessorsGroupsRepository
        }
    ],
    exports: [ProfessorsGroupsUseCases]
})
export class ProfessorsGroupsModule { }