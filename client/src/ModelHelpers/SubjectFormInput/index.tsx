import { ISubjectGroupsFormInput } from "../SubjectGroupsFormInput";

export interface ISubjectFormInput {
  id: number;
  subjectName: string;
  subjectGroups: ISubjectGroupsFormInput[];
}
