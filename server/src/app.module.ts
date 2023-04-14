import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './use-cases/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './utils/helpers/env.helper';
import { SubjectModule } from './use-cases/subject/subject.module';
import { TypeOrmConfigService } from './infrastructure/data/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './use-cases/logger/logger.module';

const envFilePath: string = getEnvPath(`${__dirname}/utils/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    SubjectModule,
    AuthModule,
    LoggerModule
  ],
})
export class AppModule {
}
