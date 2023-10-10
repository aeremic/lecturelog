import { IAssignedSubject } from "../IAssignedSubject";

export interface IActiveSubjectsProps {
  userId: number;
  subjectsProp: IAssignedSubject[];
  handleStopSession(id: number): any;
  handleSessionClick(subject: IAssignedSubject): any;
}
