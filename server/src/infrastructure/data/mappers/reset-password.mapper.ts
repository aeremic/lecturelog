import { ResetPasswordEntity } from 'src/core/entities/reset-password.entity';
import { ResetPassword } from '../models/reset-password.model';

export class ResetPasswordMapper {
  public static ToEntity(
    resetPasswordModel: ResetPassword,
  ): ResetPasswordEntity {
    const resetPasswordEntity: ResetPasswordEntity = {
      id: resetPasswordModel?.id,
      userId: resetPasswordModel?.userId,
      email: resetPasswordModel?.email,
      sentOn: resetPasswordModel?.sentOn,
      code: resetPasswordModel?.code,
      notValid: resetPasswordModel?.notValid,
    };

    return resetPasswordEntity;
  }

  public static ToEntities(
    resetPasswordModels: ResetPassword[],
  ): ResetPasswordEntity[] {
    let ResetPasswordEntities: ResetPasswordEntity[];
    if (resetPasswordModels && resetPasswordModels.length > 0) {
      ResetPasswordEntities = resetPasswordModels.map((emailVerificatin) => {
        return this.ToEntity(emailVerificatin);
      });
    }

    return ResetPasswordEntities;
  }

  public static ToModel(
    resetPasswordEntity: ResetPasswordEntity,
  ): ResetPassword {
    const resetPasswordModel: ResetPassword = {
      id: resetPasswordEntity?.id,
      userId: resetPasswordEntity?.userId,
      email: resetPasswordEntity?.email,
      sentOn: resetPasswordEntity?.sentOn,
      code: resetPasswordEntity?.code,
      notValid: resetPasswordEntity?.notValid,

      user: undefined,
    };

    return resetPasswordModel;
  }
}
