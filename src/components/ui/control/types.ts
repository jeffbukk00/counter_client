import { HasChildren } from "@/shared/types";

export interface ControlPropsType extends HasChildren {
  title: string;
  action: () => void;
}
