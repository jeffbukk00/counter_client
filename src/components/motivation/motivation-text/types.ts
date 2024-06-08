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
