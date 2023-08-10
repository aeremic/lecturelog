import { IGroup } from "../Group";

export interface IActiveGroupsProps {
  groupsProp: IGroup[];
  handleStopSession(id: number): any;
  handleSessionClick(id: number): any;
}
