import { SubjectGroupEntity } from "src/core/entities";
import { SubjectGroup } from "../models";

export class SubjectGroupMapper {

    public static ToEntity(subjectGroupModel: SubjectGroup): SubjectGroupEntity {
        let subjectGroupEntity: SubjectGroupEntity = {
            id: subjectGroupModel?.id,
            groupNo: subjectGroupModel?.groupNo,
            pointsPerPresence: subjectGroupModel?.pointsPerPresence
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

            subject: null,
            studentsSubjectGroups: null,
            professorsSubjectGroups: null
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