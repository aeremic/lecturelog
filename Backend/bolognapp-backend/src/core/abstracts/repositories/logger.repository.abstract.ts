import { Injectable } from '@nestjs/common';
import { LoggerEntity } from 'src/core/entities';

@Injectable()
export abstract class LoggerRepositoryAbstract { 
    //#region Base repository   
    
    abstract get(): Promise<LoggerEntity[]>;

    abstract getById(id: number): Promise<LoggerEntity>;

    abstract createOrUpdate(loggerEntity: LoggerEntity): Promise<LoggerEntity>;

    abstract delete(id: number): Promise<number>;

    //#endregion
}