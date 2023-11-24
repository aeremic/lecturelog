import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordEntity } from 'src/core/entities/reset-password.entity';
import { ResetPassword } from '../models/reset-password.model';
import { ResetPasswordRepositoryAbstract } from 'src/core/abstracts/repositories/reset-password.repository.abstract copy';
import { ResetPasswordMapper } from '../mappers/reset-password.mapper';

export class ResetPasswordRepository
  implements ResetPasswordRepositoryAbstract
{
  @InjectRepository(ResetPassword)
  private readonly resetPasswordModelRepository: Repository<ResetPassword>;

  //#region Implementation of Base repository

  async get(): Promise<ResetPasswordEntity[]> {
    const result = await this.resetPasswordModelRepository.find();

    return ResetPasswordMapper.ToEntities(result);
  }

  async getById(id: number): Promise<ResetPasswordEntity> {
    const result = await this.resetPasswordModelRepository.findOneBy({
      id: id,
    });

    return ResetPasswordMapper.ToEntity(result);
  }

  async createOrUpdate(
    resetPasswordEntity: ResetPasswordEntity,
  ): Promise<ResetPasswordEntity> {
    const resetPasswordModel: ResetPassword =
      ResetPasswordMapper.ToModel(resetPasswordEntity);
    const result = await this.resetPasswordModelRepository.save(
      resetPasswordModel,
    );

    return ResetPasswordMapper.ToEntity(result);
  }

  async delete(id: number): Promise<number> {
    const result = await this.resetPasswordModelRepository.delete({
      id: id,
    });

    return result.affected;
  }

  //#endregion

  async getLatestResetPasswordByUserId(
    userId: number,
    code: string,
  ): Promise<ResetPasswordEntity> {
    const result = await this.resetPasswordModelRepository.findOne({
      where: { userId: userId, code: code, notValid: false },
      order: { sentOn: 'DESC' },
    });

    return ResetPasswordMapper.ToEntity(result);
  }

  async getPreviousResetPassword(email: string): Promise<ResetPasswordEntity> {
    const result = await this.resetPasswordModelRepository.findOne({
      where: { email: email, notValid: false },
    });

    return ResetPasswordMapper.ToEntity(result);
  }
}
