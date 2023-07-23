import { SubjectGroupEntity } from "./subjectgroup.entity";
import { UserEntity } from "./user.entity";

export class StudentsSubjectGroupsEntity {
    public id?: number;

    public sumOfPresencePoints: number;

    public subjectGroup?: SubjectGroupEntity;

    public student: UserEntity;
}
