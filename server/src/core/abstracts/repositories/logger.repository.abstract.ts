import { Injectable } from '@nestjs/common';
import { LoggerEntity } from 'src/core/entities';
import { GenericRepositoryAbstract } from './generic.repositoty.abstract';

@Injectable()
export abstract class LoggerRepositoryAbstract extends GenericRepositoryAbstract<LoggerEntity> {}
