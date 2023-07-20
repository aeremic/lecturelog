import { ISubjectGroup } from "../SubjectGroup";

export interface ISubject {
  id?: number;
  name: string;
  subjectGroups: ISubjectGroup[];
}
