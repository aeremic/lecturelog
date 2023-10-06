import { ErrorConstants } from 'src/core/common/constants/error.constant';

export class GenericUseCases<T extends { id?: number }> {
  async get(repository: any, logger: any): Promise<T[]> {
    let result: T[] | PromiseLike<T[]>;
    try {
      result = await repository.get();
    } catch (error) {
      logger.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
    }

    return result;
  }

  async getById(repository: any, logger: any, id: number): Promise<T> {
    let result: T | PromiseLike<T>;
    try {
      result = await repository.getById(id);
    } catch (error) {
      logger.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
    }

    return result;
  }

  async createOrUpdate(repository: any, logger: any, entity: T): Promise<T> {
    let result: T | PromiseLike<T>;
    try {
      if (entity) {
        result = await repository.createOrUpdate(entity);
      }
    } catch (error) {
      logger.log(ErrorConstants.PostMethodError, error?.message, error?.stack);
    }

    return result;
  }

  async delete(repository: any, logger: any, id: number): Promise<number> {
    let result: number;
    try {
      result = await repository.delete(id);
    } catch (error) {
      logger.log(
        ErrorConstants.DeleteMethodError,
        error?.message,
        error?.stack,
      );
    }

    return result;
  }

  isFound(entity: T): boolean {
    return entity && entity.id != undefined;
  }
}
