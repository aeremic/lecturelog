import { SubjectEntity } from "src/core/entities";

export class SubjectsDto {
    public subjects: SubjectEntity[] | PromiseLike<SubjectEntity[]>;
    public count: number | PromiseLike<number>;
}