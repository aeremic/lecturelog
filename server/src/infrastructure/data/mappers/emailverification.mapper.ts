import { EmailVerificationEntity } from "src/core/entities";
import { EmailVerification } from "../models";

export class EmailVerificationMapper {

    public static ToEntity(emailVerificationModel: EmailVerification): EmailVerificationEntity {
        let emailVerificationEntity: EmailVerificationEntity = {
            id: emailVerificationModel?.id,
            userId: emailVerificationModel?.userId,
            sentOn: emailVerificationModel?.sentOn,
            code: emailVerificationModel?.code
        };

        return emailVerificationEntity;
    }

    public static ToEntities(emailVerificationModels: EmailVerification[]): EmailVerificationEntity[] {
        let emailVerificationEntities: EmailVerificationEntity[];
        if (emailVerificationModels && emailVerificationModels.length > 0) {
            emailVerificationEntities = emailVerificationModels.map(emailVerificatin => {
                return this.ToEntity(emailVerificatin);
            });
        }

        return emailVerificationEntities;
    }

    public static ToModel(emailVerificationEntity: EmailVerificationEntity): EmailVerification {
        let emailVerificationModel: EmailVerification = {
            id: emailVerificationEntity?.id,
            userId: emailVerificationEntity?.userId,
            sentOn: emailVerificationEntity?.sentOn,
            code: emailVerificationEntity?.code,

            user: null
        };

        return emailVerificationModel;
    }
}