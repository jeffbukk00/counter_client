/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

import { BoxDataType } from "../types";

export interface MotivationLinksQueryPhasePropsType {
  boxData: BoxDataType;
  backToNotSelected: () => void;
}

export interface MotivationLinksPropsType
  extends MotivationLinksQueryPhasePropsType {
  motivationLinkIds: string[];
}

export interface MotivationLinkDataType {
  title: string;
  link: string;
}

export interface MotivationLinkEditPhasePropsType {
  boxId: string;
  motivationLinkId: string;
  motivationLinkData: MotivationLinkDataType;
  closeEditPhase: () => void;
}

export interface MotivationLinkRemoveButtonPropsType {
  boxData: BoxDataType;
  motivationLinkId: string;
}
