import { Injectable } from '@nestjs/common';
import { EmailVerificationEntity } from 'src/core/entities';

@Injectable()
export abstract class EmailVerificationRepositoryAbstract {
    //#region Base repository   

    abstract get(): Promise<EmailVerificationEntity[]>;

    abstract getById(id: number): Promise<EmailVerificationEntity>;

    abstract createOrUpdate(emailVerificationEntity: EmailVerificationEntity): Promise<EmailVerificationEntity>;

    abstract delete(id: number): Promise<number>;

    //#endregion

    abstract getPreviousEmailValidation(email: string): Promise<EmailVerificationEntity>;

    abstract getLatestEmailVerificationByUserId(userId: number, code: string): Promise<EmailVerificationEntity>;
}