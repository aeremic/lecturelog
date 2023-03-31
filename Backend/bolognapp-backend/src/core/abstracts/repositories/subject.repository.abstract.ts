import { Injectable } from '@nestjs/common';
import { SubjectEntity } from 'src/core/entities';

@Injectable()
export abstract class SubjectRepositoryAbstract {    
    abstract get(): SubjectEntity[];

    abstract getSubjectById(id: number): Promise<SubjectEntity>;
}