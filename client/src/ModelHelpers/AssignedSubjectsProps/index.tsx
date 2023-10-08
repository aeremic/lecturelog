import { IAssignedSubject } from "../AssignedSubject";

export interface IAssignedSubjectsProps {
  subjectsProp: IAssignedSubject[];
  handleStartSession(id: number): any;
  handleSubjectClick(id: number): any;
  handleAddSubjectDialogClick(): any;
}
