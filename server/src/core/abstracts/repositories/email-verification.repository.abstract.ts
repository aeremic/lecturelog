import { Injectable } from '@nestjs/common';
import { EmailVerificationEntity } from 'src/core/entities';
import { GenericRepositoryAbstract } from './generic.repositoty.abstract';

@Injectable()
export abstract class EmailVerificationRepositoryAbstract extends GenericRepositoryAbstract<EmailVerificationEntity> {
    abstract getPreviousEmailValidation(email: string): Promise<EmailVerificationEntity>;

    abstract getLatestEmailVerificationByUserId(userId: number, code: string): Promise<EmailVerificationEntity>;
}