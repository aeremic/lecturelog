import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsSubjectGroups, StudentsSubjectGroups, Subject, SubjectGroup } from 'src/infrastructure/data/models';
import { SubjectUseCases } from './subject.use-case';
import { SubjectController } from 'src/controllers/subject.controller';
import { SubjectRepositoryAbstract } from 'src/core/abstracts/repositories/subject.repository.abstract';
import { SubjectRepository } from 'src/infrastructure/data/repositories/subject.repository';
import { LoggerModule } from '../logger/logger.module';
import { ProfessorsGroupsModule } from '../professors-groups/professors-groups.module';
import { StudentsGroupsModule } from '../students-groups/students-groups.module';
import { UserModule } from '../user/user.module';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
    imports: [forwardRef(() => UserModule), LoggerModule, ProfessorsGroupsModule, StudentsGroupsModule, MessagingModule, TypeOrmModule.forFeature([Subject, SubjectGroup, StudentsSubjectGroups, ProfessorsSubjectGroups])],
    providers: [
        SubjectUseCases,
        {
            provide: SubjectRepositoryAbstract,
            useClass: SubjectRepository
        }
    ],
    controllers: [SubjectController],
    exports: [SubjectUseCases]
})
export class SubjectModule { }