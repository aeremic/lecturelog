import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { ResetPassword } from 'src/infrastructure/data/models/reset-password.model';
import { ResetPasswordRepositoryAbstract } from 'src/core/abstracts/repositories/reset-password.repository.abstract';
import { ResetPasswordUseCases } from './reset-password.use-case';
import { ResetPasswordRepository } from 'src/infrastructure/data/repositories/reset-password.repository';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([ResetPassword])],
  providers: [
    ResetPasswordUseCases,
    {
      provide: ResetPasswordRepositoryAbstract,
      useClass: ResetPasswordRepository,
    },
  ],
  exports: [ResetPasswordUseCases],
})
export class ResetPasswordModule {}
