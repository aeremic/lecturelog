import { EmailVerificationEntity } from 'src/core/entities';
import { EmailVerification } from '../models';

export class EmailVerificationMapper {
  public static ToEntity(
    emailVerificationModel: EmailVerification,
  ): EmailVerificationEntity {
    const emailVerificationEntity: EmailVerificationEntity = {
      id: emailVerificationModel?.id,
      userId: emailVerificationModel?.userId,
      email: emailVerificationModel?.email,
      sentOn: emailVerificationModel?.sentOn,
      code: emailVerificationModel?.code,
      notValid: emailVerificationModel?.notValid,
    };

    return emailVerificationEntity;
  }

  public static ToEntities(
    emailVerificationModels: EmailVerification[],
  ): EmailVerificationEntity[] {
    let emailVerificationEntities: EmailVerificationEntity[];
    if (emailVerificationModels && emailVerificationModels.length > 0) {
      emailVerificationEntities = emailVerificationModels.map(
        (emailVerificatin) => {
          return this.ToEntity(emailVerificatin);
        },
      );
    }

    return emailVerificationEntities;
  }

  public static ToModel(
    emailVerificationEntity: EmailVerificationEntity,
  ): EmailVerification {
    const emailVerificationModel: EmailVerification = {
      id: emailVerificationEntity?.id,
      userId: emailVerificationEntity?.userId,
      email: emailVerificationEntity?.email,
      sentOn: emailVerificationEntity?.sentOn,
      code: emailVerificationEntity?.code,
      notValid: emailVerificationEntity?.notValid,

      user: undefined,
    };

    return emailVerificationModel;
  }
}
