import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerRepositoryAbstract } from "src/core/abstracts/repositories/logger.repository.abstract";
import { Logger } from "../models";
import { LoggerMapper } from "../mappers/logger.mapper";
import { LoggerEntity } from "src/core/entities";

export class LoggerRepository implements LoggerRepositoryAbstract {
    @InjectRepository(Logger)
    private readonly loggerModelRepository: Repository<Logger>

    //#region Implementation of Base repository   

    async createOrUpdate(loggerEntity: LoggerEntity): Promise<LoggerEntity> {
        let loggerModel: Logger = LoggerMapper.ToModel(loggerEntity);
        let result = await this.loggerModelRepository.save(loggerModel);

        return LoggerMapper.ToEntity(result);
    }
    
    //#endregion
}