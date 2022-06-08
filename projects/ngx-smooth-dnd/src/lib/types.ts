import { ContainerOptions } from "@libertymp/smooth-dnd";

export interface DropResult {
  from: number | null;
  to: number | null;
  payload: any;
  origin: string;
}
