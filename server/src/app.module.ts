import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './use-cases/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './utils/helpers/env.helper';
import { SubjectModule } from './use-cases/subject/subject.module';
import { TypeOrmConfigService } from './infrastructure/data/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './use-cases/logger/logger.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './services/mailing/mail.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MessagingModule } from './messaging/messaging.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

const envFilePath: string = getEnvPath(`${__dirname}/utils/envs`);
@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          port: 587,
          secure: false,
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: 'imi.bolognapp@gmail.com',
        },
        template: {
          dir: __dirname,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    SubjectModule,
    AuthModule,
    LoggerModule,
    MailModule,
    MessagingModule,
  ],
})
export class AppModule {}
