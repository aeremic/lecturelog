import { UserEntity } from 'src/core/entities';
import { Injectable } from '@nestjs/common';
import { GenericRepositoryAbstract } from './generic.repositoty.abstract';

@Injectable()
export abstract class UserRepositoryAbstract extends GenericRepositoryAbstract<UserEntity> {
  abstract getByFirstname(firstname: string): Promise<UserEntity>;

  abstract getByEmail(email: string, includeHash: boolean): Promise<UserEntity>;

  abstract getByEmailOrIndex(
    email: string,
    index: number,
    year: number,
  ): Promise<UserEntity>;

  abstract getByIndex(
    index: number,
    year: number,
    includeHash: boolean,
  ): Promise<UserEntity>;

  abstract getProfessors(size: number, skip: number): Promise<UserEntity[]>;

  abstract getProfessorsCount(): Promise<number>;

  abstract getStudents(size: number, skip: number): Promise<UserEntity[]>;

  abstract getStudentsCount(): Promise<number>;

  abstract getAllExceptAdmin(): Promise<UserEntity[]>;

  abstract getByIds(ids: number[]): Promise<UserEntity[]>;

  abstract getByIdWithHash(id: number): Promise<UserEntity>;
}
