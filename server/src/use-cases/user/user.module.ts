import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  EmailVerification,
  StudentsSubjects,
} from 'src/infrastructure/data/models';
import { UserUseCases } from './user.use-case';
import { UserRepository } from 'src/infrastructure/data/repositories/user.repository';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserController } from 'src/controllers/user.controller';
import { LoggerModule } from '../logger/logger.module';
import { ProfessorController } from 'src/controllers/professor.controller';
import { StudentController } from 'src/controllers/student.controller';
import { MailModule } from 'src/services/mailing/mail.module';
import { EmailVerificationModule } from '../emailverification/email-verification.module';
import { SubjectModule } from '../subject/subject.module';
import { LectureModule } from '../lecture/lecture.module';
import { BcryptModule } from 'src/services/cryptography/bcrypt.module';
import { ParserModule } from 'src/services/csv/parser.module';

@Module({
  imports: [
    forwardRef(() => SubjectModule),
    LoggerModule,
    MailModule,
    EmailVerificationModule,
    BcryptModule,
    LectureModule,
    ParserModule,
    TypeOrmModule.forFeature([User, EmailVerification, StudentsSubjects]),
  ],
  providers: [
    UserUseCases,
    {
      provide: UserRepositoryAbstract,
      useClass: UserRepository,
    },
  ],
  controllers: [UserController, ProfessorController, StudentController],
  exports: [UserUseCases],
})
export class UserModule {}
