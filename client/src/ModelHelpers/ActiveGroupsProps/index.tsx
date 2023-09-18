import { IGroup } from "../Group";

export interface IActiveGroupsProps {
  userId: number;
  groupsProp: IGroup[];
  handleStopSession(id: number): any;
  handleSessionClick(group: IGroup): any;
}
