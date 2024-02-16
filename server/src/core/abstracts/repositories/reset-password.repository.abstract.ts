import { Injectable } from '@nestjs/common';
import { GenericRepositoryAbstract } from './generic.repositoty.abstract';
import { ResetPasswordEntity } from 'src/core/entities/reset-password.entity';

@Injectable()
export abstract class ResetPasswordRepositoryAbstract extends GenericRepositoryAbstract<ResetPasswordEntity> {
  abstract getPreviousResetPassword(
    email: string,
  ): Promise<ResetPasswordEntity>;

  abstract getLatestResetPasswordByUserId(
    userId: number,
    code: string,
  ): Promise<ResetPasswordEntity>;
}
