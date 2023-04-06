import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsSubjects, StudentsSubjects, User } from 'src/infrastructure/implementations/models';
import { UserUseCases } from './user.use-case';
import { UserRepository } from 'src/infrastructure/implementations/repositories/user.repository';
import { UserRepositoryAbstract } from 'src/core/abstracts/repositories/user.repository.abstract';
import { UserController } from 'src/controllers/user.controller';
import { AuthService } from 'src/services';

@Module({
    imports: [TypeOrmModule.forFeature([User, StudentsSubjects, ProfessorsSubjects])],
    providers: [
        UserUseCases,
        {
            provide: UserRepositoryAbstract,
            useClass: UserRepository
        }
    ],
    controllers: [UserController],
    exports: [UserUseCases]
})
export class UserModule { }