import { ErrorConstants } from 'src/core/common/constants/error.constant';

export class GenericUseCases<T extends { id?: number }> {
  /**
   * Method for getting entity
   * @param repository Repository of the entity
   * @param logger Logger for logging errors
   * @returns Promise of the entity
   */
  async get(repository: any, logger: any): Promise<T[]> {
    let result: T[] | PromiseLike<T[]>;
    try {
      result = await repository.get();
    } catch (error) {
      logger.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
    }

    return result;
  }

  /**
   * Method for getting entity by the identifier
   * @param repository Repository of the entity
   * @param logger Logger for logging errors
   * @param id Entity identifier
   * @returns Promise of the entity
   */
  async getById(repository: any, logger: any, id: number): Promise<T> {
    let result: T | PromiseLike<T>;
    try {
      result = await repository.getById(id);
    } catch (error) {
      logger.log(ErrorConstants.GetMethodError, error?.message, error?.stack);
    }

    return result;
  }
  /**
   * Create new or update existing record of given entity
   * @param repository Repository of the entity
   * @param logger Logger for logging errors
   * @param entity Inserting or updating entity
   * @returns Promise of the entity
   */
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

  /**
   * Method for removing entity by identifier
   * @param repository Repository of the entity
   * @param logger Logger for logging errors
   * @param id Entity identifier
   * @returns Promise of the entity
   */
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

  /**
   * Method for determing if entity is found in the database
   * @param entity Entity
   * @returns True if entity is found, otherwise false
   */
  isFound(entity: T): boolean {
    return entity && entity.id != undefined;
  }
}
