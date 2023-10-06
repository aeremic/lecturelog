import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from 'src/infrastructure/data/models';
import { EmailVerificationUseCases } from './email-verification.use-case';
import { EmailVerificationRepositoryAbstract } from 'src/core/abstracts/repositories/email-verification.repository.abstract';
import { EmailVerificationRepository } from 'src/infrastructure/data/repositories/email-verification.repository';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([EmailVerification])],
  providers: [
    EmailVerificationUseCases,
    {
      provide: EmailVerificationRepositoryAbstract,
      useClass: EmailVerificationRepository,
    },
  ],
  exports: [EmailVerificationUseCases],
})
export class EmailVerificationModule {}
