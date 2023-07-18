import { UserEntity } from "./user.entity";

export class StudentsSubjectGroupsEntity {
    public id: number;

    public sumOfPresencePoints: number;

    public student: UserEntity;
}
