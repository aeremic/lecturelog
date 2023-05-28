import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsSubjects, StudentsSubjects, User } from 'src/infrastructure/data/models';
import { UserUseCases } from './user.use-case';
import { UserRepository } from 'src/infrastructure/data/repositories/user.repository';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserController } from 'src/controllers/user.controller';
import { LoggerModule } from '../logger/logger.module';
import { ProfessorController } from 'src/controllers/professor.controller';
import { StudentController } from 'src/controllers/student.controller';
import { MailModule } from 'src/services/mail.module';

@Module({
    imports: [LoggerModule, MailModule, TypeOrmModule.forFeature([User, StudentsSubjects, ProfessorsSubjects])],
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