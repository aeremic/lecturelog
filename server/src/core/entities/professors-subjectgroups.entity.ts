import { SubjectGroupEntity } from "./subjectgroup.entity";
import { UserEntity } from "./user.entity";

export class ProfessorsSubjectGroupsEntity {
    public id?: number;

    public subjectGroup: SubjectGroupEntity;

    public professor: UserEntity;
}
