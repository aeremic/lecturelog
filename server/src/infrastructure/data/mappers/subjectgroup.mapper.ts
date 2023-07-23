import { SubjectGroupEntity } from "src/core/entities";
import { SubjectGroup } from "../models";
import { StudentsSubjectGroupsMapper } from "./students-subjectgroups.mapper";
import { ProfessorsSubjectGroupsMapper } from "./professors-subjectgroups.mapper";

export class SubjectGroupMapper {

    public static ToEntity(subjectGroupModel: SubjectGroup): SubjectGroupEntity {
        let subjectGroupEntity: SubjectGroupEntity = {
            id: subjectGroupModel?.id,
            groupNo: subjectGroupModel?.groupNo,
            pointsPerPresence: subjectGroupModel?.pointsPerPresence,
            students: StudentsSubjectGroupsMapper.ToEntities(subjectGroupModel?.studentsSubjectGroups),
            professors: ProfessorsSubjectGroupsMapper.ToEntities(subjectGroupModel?.professorsSubjectGroups)
        };

        return subjectGroupEntity;
    }

    public static ToEntities(subjectGroupModels: SubjectGroup[]): SubjectGroupEntity[] {
        let subjectGroupEntities: SubjectGroupEntity[];
        if (subjectGroupModels && subjectGroupModels.length > 0) {
            subjectGroupEntities = subjectGroupModels.map(subjectGroupModel => {
                return this.ToEntity(subjectGroupModel);
            });
        }

        return subjectGroupEntities;
    }

    public static ToModel(subjectGroupEntity: SubjectGroupEntity): SubjectGroup {
        let subjectGroupModel: SubjectGroup = {
            id: subjectGroupEntity?.id,
            groupNo: subjectGroupEntity?.groupNo,
            pointsPerPresence: subjectGroupEntity?.pointsPerPresence,
            studentsSubjectGroups: StudentsSubjectGroupsMapper.ToModels(subjectGroupEntity?.students),
            professorsSubjectGroups: ProfessorsSubjectGroupsMapper.ToModels(subjectGroupEntity?.professors),

            subject: undefined,
        };

        return subjectGroupModel;
    }

    public static ToModels(subjectGroupEntities: SubjectGroupEntity[]): SubjectGroup[] {
        let subjectGroupModels: SubjectGroup[];
        if (subjectGroupEntities && subjectGroupEntities.length > 0) {
            subjectGroupModels = subjectGroupEntities.map(subjectGroupEntity => {
                return this.ToModel(subjectGroupEntity);
            });
        }

        return subjectGroupModels;
    }

}