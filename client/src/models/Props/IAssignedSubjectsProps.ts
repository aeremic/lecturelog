import { IAssignedSubject } from "../IAssignedSubject";

export interface IAssignedSubjectsProps {
  subjectsProp: IAssignedSubject[];
  handleStartSession(id: number): any;
  handleSubjectClick(id: number): any;
  handleAddSubjectDialogClick(): any;
}
