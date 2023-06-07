export abstract class GenericRepositoryAbstract<T> {
    abstract get(): Promise<T[]>;

    abstract getById(id: number): Promise<T>;

    abstract createOrUpdate(t: T): Promise<T>;

    abstract delete(id: number): Promise<number>;
}