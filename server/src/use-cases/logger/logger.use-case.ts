import { Inject, Injectable } from '@nestjs/common';
import { GenericUseCases } from '../generic.use-case';
import { LoggerEntity } from 'src/core/entities';
import { LoggerRepositoryAbstract } from 'src/core/abstracts/repositories/logger.repository.abstract';

@Injectable()
export class LoggerUseCases {
  //#region Properties

  @Inject(LoggerRepositoryAbstract)
  private loggerRepository: LoggerRepositoryAbstract;

  //#endregion

  //#region Public methods

  async create(loggerEntity: LoggerEntity): Promise<LoggerEntity> {
    return this.loggerRepository.createOrUpdate(loggerEntity);
  }

  async log(code?: number, description?: string, stackTrace?: string) {
    try {
      const loggerEntity: LoggerEntity = {
        code: code,
        description: description,
        stackTrace: stackTrace,
      };

      await this.create(loggerEntity);
    } catch {}
  }

  async logWithoutCode(description?: string, stackTrace?: string) {
    try {
      const loggerEntity: LoggerEntity = {
        code: 0,
        description: description,
        stackTrace: stackTrace,
      };

      await this.create(loggerEntity);
    } catch {}
  }

  //#endregion
}
