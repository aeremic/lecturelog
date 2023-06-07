import { Injectable } from '@nestjs/common';
import { SubjectEntity } from 'src/core/entities';
import { GenericRepositoryAbstract } from './generic.repositoty.abstract';

@Injectable()
export abstract class SubjectRepositoryAbstract extends GenericRepositoryAbstract<SubjectEntity>  {
}