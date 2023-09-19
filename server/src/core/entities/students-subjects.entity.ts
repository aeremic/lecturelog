import { SubjectEntity } from "./subject.entity";
import { UserEntity } from "./user.entity";

export class StudentsSubjectsEntity {
    public id?: number;

    public sumOfPresencePoints: number;

    public subject?: SubjectEntity;

    public student: UserEntity;
}
