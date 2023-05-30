import { Injectable } from '@nestjs/common';
import { SubjectEntity } from 'src/core/entities';

@Injectable()
export abstract class SubjectRepositoryAbstract {
    //#region Base repository   

    abstract get(): Promise<SubjectEntity[]>;

    abstract getById(id: number): Promise<SubjectEntity>;

    abstract createOrUpdate(subjectEntity: SubjectEntity): Promise<SubjectEntity>;

    abstract delete(id: number): Promise<number>;

    //#endregion

}