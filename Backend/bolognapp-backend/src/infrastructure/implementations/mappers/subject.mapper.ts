import { SubjectEntity } from "src/core/entities";
import { Subject } from "../models";

export class SubjectMapper {
    
    public static ToEntity(subjectModel: Subject): SubjectEntity {
        let subjectEntity: SubjectEntity = {
            id: subjectModel?.id,
            name: subjectModel?.name,
            pointsPerPresence: subjectModel?.pointsPerPresence
        };

        return subjectEntity;
    }

    //.toDomain(); map UserModel to UserEntity and return it
    public static ToEntities(subjectModels: Subject[]): SubjectEntity[] {
        return null;
    }

    public static ToModel(subjectEntity: SubjectEntity): Subject {
        return new Subject();
    }
}