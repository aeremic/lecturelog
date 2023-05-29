import { SubjectEntity } from "src/core/entities";
import { Subject, SubjectGroup } from "../models";
import { SubjectGroupMapper } from "./subjectgroup.mapper";

export class SubjectMapper {

    public static ToEntity(subjectModel: Subject): SubjectEntity {
        let subjectEntity: SubjectEntity = {
            id: subjectModel?.id,
            name: subjectModel?.name,
            subjectGroups: SubjectGroupMapper.ToEntities(subjectModel?.subjectGroups),
        };

        return subjectEntity;
    }

    public static ToEntities(subjectModels: Subject[]): SubjectEntity[] {
        let subjectEntities: SubjectEntity[];
        if (subjectModels && subjectModels.length > 0) {
            subjectEntities = subjectModels.map(subjectModel => {
                return this.ToEntity(subjectModel);
            });
        }

        return subjectEntities;
    }

    public static ToModel(subjectEntity: SubjectEntity): Subject {
        let subjectModel: Subject = {
            id: subjectEntity?.id,
            name: subjectEntity?.name,
            subjectGroups: SubjectGroupMapper.ToModels(subjectEntity?.subjectGroups)
        };

        return subjectModel;
    }
}