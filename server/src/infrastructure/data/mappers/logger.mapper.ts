import { LoggerEntity } from 'src/core/entities';
import { Logger } from '../models';

export class LoggerMapper {
  public static ToEntity(loggerModel: Logger): LoggerEntity {
    const loggerEntity: LoggerEntity = {
      id: loggerModel?.id,
      code: loggerModel?.code,
      description: loggerModel?.description,
      stackTrace: loggerModel?.stackTrace,
      dateLogged: loggerModel?.dateLogged,
    };

    return loggerEntity;
  }

  public static ToEntities(loggerModels: Logger[]): LoggerEntity[] {
    let loggerEntities: LoggerEntity[];
    if (loggerModels && loggerModels.length > 0) {
      loggerEntities = loggerModels.map((loggerModel) => {
        return this.ToEntity(loggerModel);
      });
    }

    return loggerEntities;
  }

  public static ToModel(loggerEntity: LoggerEntity): Logger {
    const loggerModel: Logger = {
      id: loggerEntity?.id,
      code: loggerEntity?.code,
      description: loggerEntity?.description,
      stackTrace: loggerEntity?.stackTrace,
      dateLogged: loggerEntity?.dateLogged,
    };

    return loggerModel;
  }
}
