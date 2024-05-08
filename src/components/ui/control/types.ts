import { HasChildren } from "@/shared-types/props";

export interface ControlPropsType extends HasChildren {
  title: string;
  action: () => void;
}
