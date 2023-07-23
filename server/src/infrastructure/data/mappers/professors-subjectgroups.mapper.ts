import { ProfessorsSubjectGroupsEntity, SubjectGroupEntity } from "src/core/entities";
import { ProfessorsSubjectGroups, SubjectGroup } from "../models";
import { UserMapper } from './user.mapper';
import { SubjectGroupMapper } from "./subjectgroup.mapper";

export class ProfessorsSubjectGroupsMapper {

    public static ToEntity(professorsSubjectGroupsModel: ProfessorsSubjectGroups): ProfessorsSubjectGroupsEntity {
        let professorsSubjectGroupsEntity: ProfessorsSubjectGroupsEntity = {
            id: professorsSubjectGroupsModel?.id,
            professor: UserMapper.ToEntity(professorsSubjectGroupsModel?.professor),
            subjectGroup: SubjectGroupMapper.ToEntity(professorsSubjectGroupsModel?.subjectGroup),
        };

        return professorsSubjectGroupsEntity;
    }

    public static ToEntities(professorsSubjectGroupsModels: ProfessorsSubjectGroups[]): ProfessorsSubjectGroupsEntity[] {
        let professorsSubjectGroupsEnties: ProfessorsSubjectGroupsEntity[];
        if (professorsSubjectGroupsModels && professorsSubjectGroupsModels.length > 0) {
            professorsSubjectGroupsEnties = professorsSubjectGroupsModels.map(professorsSubjectGroupsModel => {
                return this.ToEntity(professorsSubjectGroupsModel);
            });
        }

        return professorsSubjectGroupsEnties;
    }

    public static ToModel(professorsSubjectGroupsEntity: ProfessorsSubjectGroupsEntity): ProfessorsSubjectGroups {
        let professorsSubjectGroups: ProfessorsSubjectGroups = {
            id: professorsSubjectGroupsEntity?.id,
            professor: UserMapper.ToModel(professorsSubjectGroupsEntity?.professor),
            professorId: professorsSubjectGroupsEntity?.professor?.id,

            subjectGroup: undefined,
            subjectGroupId: undefined
        };

        return professorsSubjectGroups;
    }

    public static ToModels(professorsSubjectGroupsEntities: ProfessorsSubjectGroupsEntity[]): ProfessorsSubjectGroups[] {
        let professorsSubjectGroupsModels: ProfessorsSubjectGroups[];
        if (professorsSubjectGroupsEntities && professorsSubjectGroupsEntities.length > 0) {
            professorsSubjectGroupsModels = professorsSubjectGroupsEntities.map(professorsSubjectGroupsEntitity => {
                return this.ToModel(professorsSubjectGroupsEntitity);
            });
        }

        return professorsSubjectGroupsModels;
    }
}