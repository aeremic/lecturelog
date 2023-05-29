import { SubjectGroupEntity } from "./subjectgroup.entity";

export class SubjectEntity {
    public id: number;

    public name: string;

    public subjectGroups: SubjectGroupEntity[];

}
