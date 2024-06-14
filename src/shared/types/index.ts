// 전역적으로 사용 되는 타입들

import { ReactNode } from "react";

export interface HasChildren {
  children: ReactNode;
}

export interface HasChildrenWithClasses {
  classes: string;
  children: ReactNode;
}
