import { IGroup } from "../Group";

export interface IAssignedGroupsProps {
  groupsProp: IGroup[];
  handleStartSession(id: number): any;
}
