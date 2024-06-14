/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

import { BoxDataType } from "../types";

export interface MotivationTextsQueryPhasePropsType {
  boxData: BoxDataType;
  backToNotSelected: () => void;
}

export interface MotivationTextsPropsType
  extends MotivationTextsQueryPhasePropsType {
  motivationTextIds: string[];
}

export interface MotivationTextPropsType {
  boxData: BoxDataType;
  motivationTextId: string;
}

export interface MotivationTextEditPhasePropsType {
  boxId: string;
  motivationTextId: string;
  motivationTextData: { text: string };
  closeEditPhase: () => void;
}

export interface MotivationTextRemoveButtonPropsType {
  boxData: BoxDataType;
  motivationTextId: string;
}
