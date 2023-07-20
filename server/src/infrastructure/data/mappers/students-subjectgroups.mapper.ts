import { StudentsSubjectGroupsEntity, SubjectGroupEntity } from "src/core/entities";
import { StudentsSubjectGroups } from "../models";
import { UserMapper } from './user.mapper';

export class StudentsSubjectGroupsMapper {

    public static ToEntity(studentsSubjectGroupsModel: StudentsSubjectGroups): StudentsSubjectGroupsEntity {
        let studentsSubjectGroupsEntity: StudentsSubjectGroupsEntity = {
            id: studentsSubjectGroupsModel?.id,
            sumOfPresencePoints: studentsSubjectGroupsModel?.sumOfPresencePoints,
            student: UserMapper.ToEntity(studentsSubjectGroupsModel?.student)
        };

        return studentsSubjectGroupsEntity;
    }

    public static ToEntities(studentsSubjectGroupsModels: StudentsSubjectGroups[]): StudentsSubjectGroupsEntity[] {
        let studentsSubjectGroupsEnties: StudentsSubjectGroupsEntity[];
        if (studentsSubjectGroupsModels && studentsSubjectGroupsModels.length > 0) {
            studentsSubjectGroupsEnties = studentsSubjectGroupsModels.map(studentsSubjectGroupsModel => {
                return this.ToEntity(studentsSubjectGroupsModel);
            });
        }

        return studentsSubjectGroupsEnties;
    }

    public static ToModel(studentsSubjectGroupsEntity: StudentsSubjectGroupsEntity): StudentsSubjectGroups {
        let studentsSubjectGroups: StudentsSubjectGroups = {
            id: studentsSubjectGroupsEntity?.id,
            sumOfPresencePoints: studentsSubjectGroupsEntity?.sumOfPresencePoints,
            student: UserMapper.ToModel(studentsSubjectGroupsEntity.student),

            subjectGroup: undefined,
            studentId: undefined,
            subjectGroupId: undefined
        };

        return studentsSubjectGroups;
    }

    public static ToModels(studentsSubjectGroupsEntities: StudentsSubjectGroupsEntity[]): StudentsSubjectGroups[] {
        let studentsSubjectGroupsModels: StudentsSubjectGroups[];
        if (studentsSubjectGroupsEntities && studentsSubjectGroupsEntities.length > 0) {
            studentsSubjectGroupsModels = studentsSubjectGroupsEntities.map(studentsSubjectGroupsEntitity => {
                return this.ToModel(studentsSubjectGroupsEntitity);
            });
        }

        return studentsSubjectGroupsModels;
    }
}