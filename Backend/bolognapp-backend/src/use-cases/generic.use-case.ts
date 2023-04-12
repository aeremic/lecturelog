export class GenericUseCases<T extends { id?: number }> {
    
    async get(repository: any): Promise<T[]> {
        let result: T[] | PromiseLike<T[]>;
        try {
            result = await repository.get();
        } catch (error) {
            // log error
        }

        return result;
    }

    async getById(repository: any, id: number): Promise<T> {
        let result: T | PromiseLike<T>;
        try {
            result = await repository.getById(id);
        } catch (error) {
            // log error
        }

        return result;
    }

    async create(repository: any, entity: T): Promise<T> {
        let result: T | PromiseLike<T>;
        try {
            if (entity) {
                result = await repository.createOrUpdate(entity);
            }
        } catch (error) {
            // log error
        }

        return result;
    }

    async update(repository: any, entity: T): Promise<T> {
        let result: T | PromiseLike<T>;
        try {
            if (entity) {
                result = await repository.createOrUpdate(entity);
            }
        } catch (error) {
            // log error
        }

        return result;
    }

    async delete(repository: any, id: number): Promise<number> {
        let result: number;
        try {
            result = await repository.delete(id);
        } catch (error) {
            // log error
        }

        return result;
    }

    isFound(entity: T): Boolean {
        return entity && entity.id != undefined;
    }
}