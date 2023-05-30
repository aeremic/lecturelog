import { Inject, Injectable } from '@nestjs/common';
import { EmailVerificationRepositoryAbstract } from 'src/core/abstracts/repositories/email-verification.repository.abstract';
import { LoggerUseCases } from '../logger/logger.use-case';
import { GenericUseCases } from '../generic.use-case';
import { EmailVerificationEntity } from 'src/core/entities';

@Injectable()
export class EmailVerificationUseCases extends GenericUseCases<EmailVerificationEntity>{
    @Inject(EmailVerificationRepositoryAbstract)
    private emailVerificationRepository: EmailVerificationRepositoryAbstract

    @Inject(LoggerUseCases)
    private loggerUseCases: LoggerUseCases;

    async get(): Promise<EmailVerificationEntity[]> {
        return super.get(this.emailVerificationRepository, this.loggerUseCases);
    }

    async getById(id: number): Promise<EmailVerificationEntity> {
        return super.getById(this.emailVerificationRepository, this.loggerUseCases, id);
    }

    async createOrUpdate(EmailVerificationEntity: EmailVerificationEntity): Promise<EmailVerificationEntity> {
        return super.createOrUpdate(this.emailVerificationRepository, this.loggerUseCases, EmailVerificationEntity);
    }

    async delete(id: number): Promise<number> {
        return super.delete(this.emailVerificationRepository, this.loggerUseCases, id);
    }

    async createValidation(userId: number, email: string, code: string): Promise<EmailVerificationEntity> {
        let emailVerification: EmailVerificationEntity = {
            userId: userId,
            email: email,
            sentOn: new Date(Date.now()),
            code: code
        };

        return this.createOrUpdate(emailVerification);
    }

    async invalidPreviousEmailValidation(email: string): Promise<void> {
        let previousEmailValidation = await this.emailVerificationRepository.getPreviousEmailValidation(email);
        if (this.isFound(previousEmailValidation)) {
            previousEmailValidation.expired = true;
            this.createOrUpdate(previousEmailValidation);
        }
    }

    async getLatestEmailVerificationByUserId(userId: number, code: string): Promise<EmailVerificationEntity> {
        return this.emailVerificationRepository.getLatestEmailVerificationByUserId(userId, code);
    }
}