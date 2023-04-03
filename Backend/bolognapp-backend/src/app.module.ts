import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './use-cases/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './utils/helpers/env.helper';
import { TypeOrmConfigService } from './services/typeorm.service';
import { SubjectModule } from './use-cases/subject/subject.module';

// const settings = require("../ormconfig.json");
const envFilePath: string = getEnvPath(`${__dirname}/utils/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    // TypeOrmModule.forRoot(settings),
    UserModule,
    SubjectModule
  ],
})
export class AppModule {
}
