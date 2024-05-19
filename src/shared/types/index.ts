import { ReactNode } from "react";

export interface HasChildren {
  children: ReactNode;
}

export interface HasChildrenWithClasses {
  classes: string;
  children: ReactNode;
}
