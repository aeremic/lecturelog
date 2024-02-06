import { Inject, Injectable } from '@nestjs/common';
import { LoggerUseCases } from '../logger/logger.use-case';
import { GenericUseCases } from '../generic.use-case';
import { ResetPasswordRepositoryAbstract } from 'src/core/abstracts/repositories/reset-password.repository.abstract';
import { ResetPasswordEntity } from 'src/core/entities/reset-password.entity';

@Injectable()
export class ResetPasswordUseCases extends GenericUseCases<ResetPasswordEntity> {
  //#region Properties

  @Inject(ResetPasswordRepositoryAbstract)
  private resetPasswordRepository: ResetPasswordRepositoryAbstract;

  @Inject(LoggerUseCases)
  private loggerUseCases: LoggerUseCases;

  //#endregion

  //#region Public methods

  async get(): Promise<ResetPasswordEntity[]> {
    return super.get(this.resetPasswordRepository, this.loggerUseCases);
  }

  async getById(id: number): Promise<ResetPasswordEntity> {
    return super.getById(this.resetPasswordRepository, this.loggerUseCases, id);
  }

  async createOrUpdate(
    resetPasswordEntity: ResetPasswordEntity,
  ): Promise<ResetPasswordEntity> {
    return super.createOrUpdate(
      this.resetPasswordRepository,
      this.loggerUseCases,
      resetPasswordEntity,
    );
  }

  async delete(id: number): Promise<number> {
    return super.delete(this.resetPasswordRepository, this.loggerUseCases, id);
  }

  async createResetPassword(
    userId: number,
    email: string,
    code: string,
  ): Promise<ResetPasswordEntity> {
    const resetPassword: ResetPasswordEntity = {
      userId: userId,
      email: email,
      sentOn: new Date(Date.now()),
      code: code,
      notValid: false,
    };

    return this.createOrUpdate(resetPassword);
  }

  async invalidPreviousResetPassword(email: string): Promise<void> {
    const previousResetPassword =
      await this.resetPasswordRepository.getPreviousResetPassword(email);
    if (this.isFound(previousResetPassword)) {
      previousResetPassword.notValid = true;
      this.createOrUpdate(previousResetPassword);
    }
  }

  async getLatestResetPasswordByUserId(
    userId: number,
    code: string,
  ): Promise<ResetPasswordEntity> {
    return this.resetPasswordRepository.getLatestResetPasswordByUserId(
      userId,
      code,
    );
  }

  //#endregion
}
