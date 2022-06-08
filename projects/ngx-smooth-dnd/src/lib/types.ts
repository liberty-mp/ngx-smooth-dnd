import { ContainerOptions } from "@libertymp/smooth-dnd";

export interface DropResult {
  startIndex: number | null;
  endIndex: number | null;
  payload: any;
  options: ContainerOptions;
}
