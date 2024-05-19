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
  showRemoveButton: () => void;
  hideRemoveButton: () => void;
}
