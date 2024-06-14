/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

import { HasChildren } from "@/shared/types";

export interface ControlPropsType extends HasChildren {
  title: string;
  action: () => void;
}
