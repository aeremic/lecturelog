import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from 'src/infrastructure/data/models';
import { LoggerUseCases } from './logger.use-case';
import { LoggerRepositoryAbstract } from 'src/core/abstracts/repositories/logger.repository.abstract';
import { LoggerRepository } from 'src/infrastructure/data/repositories/logger.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Logger])],
  providers: [
    LoggerUseCases,
    {
      provide: LoggerRepositoryAbstract,
      useClass: LoggerRepository,
    },
  ],
  exports: [LoggerUseCases],
})
export class LoggerModule {}
