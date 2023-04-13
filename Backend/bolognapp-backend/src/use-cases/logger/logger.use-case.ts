import { Inject, Injectable } from '@nestjs/common';
import { GenericUseCases } from '../generic.use-case';
import { LoggerEntity } from 'src/core/entities';
import { LoggerRepositoryAbstract } from 'src/core/abstracts/repositories/logger.repository.abstract';

@Injectable()
export class LoggerUseCases extends GenericUseCases<LoggerEntity>{
    @Inject(LoggerRepositoryAbstract)
    private loggerRepository: LoggerRepositoryAbstract

    async get(): Promise<LoggerEntity[]> {
        return super.get(this.loggerRepository);
    }

    async getById(id: number): Promise<LoggerEntity> {
        return super.getById(this.loggerRepository, id);
    }

    async create(loggerEntity: LoggerEntity): Promise<LoggerEntity> {
        return super.create(this.loggerRepository, loggerEntity);
    }

    async update(loggerEntity: LoggerEntity): Promise<LoggerEntity> {
        return super.update(this.loggerRepository, loggerEntity);
    }

    async delete(id: number): Promise<number> {
        return super.delete(this.loggerRepository, id);
    }

    async log(code?: number, description?: string, stackTrace?: string) {
        try {
            let loggerEntity: LoggerEntity = {
                code: code,
                description: description,
                stackTrace: stackTrace
            };

            this.create(loggerEntity);
        } catch { }
    }
}