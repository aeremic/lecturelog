import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsSubjectGroups, StudentsSubjectGroups, User, EmailVerification } from 'src/infrastructure/data/models';
import { UserUseCases } from './user.use-case';
import { UserRepository } from 'src/infrastructure/data/repositories/user.repository';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserController } from 'src/controllers/user.controller';
import { LoggerModule } from '../logger/logger.module';
import { ProfessorController } from 'src/controllers/professor.controller';
import { StudentController } from 'src/controllers/student.controller';
import { MailModule } from 'src/services/mail.module';
import { EmailVerificationModule } from '../emailverification/email-verification.module';
import { AuthModule } from 'src/auth/auth.module';
import { BcryptModule } from 'src/services/bcrypt.module';

@Module({
    imports: [LoggerModule, MailModule, EmailVerificationModule, BcryptModule, TypeOrmModule.forFeature([User, EmailVerification, StudentsSubjectGroups, ProfessorsSubjectGroups])],
    providers: [
        UserUseCases,
        {
            provide: UserRepositoryAbstract,
            useClass: UserRepository
        },
    ],
    controllers: [UserController, ProfessorController, StudentController],
    exports: [UserUseCases]
})
export class UserModule { }