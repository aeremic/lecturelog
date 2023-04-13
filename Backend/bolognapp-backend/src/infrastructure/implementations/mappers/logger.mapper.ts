import { LoggerEntity } from "src/core/entities";
import { Logger } from "../models";

export class LoggerMapper {

    public static ToEntity(loggerModel: Logger): LoggerEntity {
        let loggerEntity: LoggerEntity = {
            id: loggerModel?.id,
            code: loggerModel?.code,
            description: loggerModel?.description,
            stackTrace: loggerModel?.stackTrace,
            dateLogged: loggerModel?.dateLogged
        };

        return loggerEntity;
    }

    public static ToModel(loggerEntity: LoggerEntity): Logger {
        let loggerModel: Logger = {
            id: loggerEntity?.id,
            code: loggerEntity?.code,
            description: loggerEntity?.description,
            stackTrace: loggerEntity?.stackTrace,
            dateLogged: loggerEntity?.dateLogged,
        };

        return loggerModel;
    }
}