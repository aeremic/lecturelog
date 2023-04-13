import { LoggerEntity } from "src/core/entities";
import { Logger } from "../models";

export class LoggerMapper {

    public static ToEntity(loggerModel: Logger): LoggerEntity {
        let loggerEntity: LoggerEntity = {
            id: loggerModel?.id,
            title: loggerModel?.title,
            code: loggerModel?.code,
            description: loggerModel?.description,
            dateLogged: loggerModel?.dateLogged
        };

        return loggerEntity;
    }

    public static ToModel(loggerEntity: LoggerEntity): Logger {
        let loggerModel: Logger = {
            id: loggerEntity?.id,
            title: loggerEntity?.title,
            code: loggerEntity?.code,
            description: loggerEntity?.description,
            dateLogged: loggerEntity?.dateLogged,
        };

        return loggerModel;
    }
}