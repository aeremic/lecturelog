import { Injectable } from '@nestjs/common';
import { LoggerEntity } from 'src/core/entities';

@Injectable()
export abstract class LoggerRepositoryAbstract { 
    //#region Base repository   
    
    abstract createOrUpdate(loggerEntity: LoggerEntity): Promise<LoggerEntity>;

    //#endregion
}