import { Inject, Injectable } from '@nestjs/common';
import { GenericUseCases } from '../generic.use-case';
import { LoggerEntity, ProfessorsSubjectGroupsEntity } from 'src/core/entities';
import { LoggerRepositoryAbstract } from 'src/core/abstracts/repositories/logger.repository.abstract';
import { ProfessorsGroupsRepositoryAbstract } from 'src/core/abstracts/repositories/professors-groups.repository.abstract';
import { LoggerUseCases } from '../logger/logger.use-case';

@Injectable()
export class ProfessorsGroupsUseCases extends GenericUseCases<ProfessorsSubjectGroupsEntity> {
    @Inject(ProfessorsGroupsRepositoryAbstract)
    private professorsGroupsRepository: ProfessorsGroupsRepositoryAbstract

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    async createOrUpdate(professorsSubjectGroupsEntity: ProfessorsSubjectGroupsEntity): Promise<ProfessorsSubjectGroupsEntity> {
        return super.createOrUpdate(this.professorsGroupsRepository, this.loggerUseCases, professorsSubjectGroupsEntity);
    }
}