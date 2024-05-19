export interface BoxCreatorPropsType {
  boxCreatorType: number;
  bucketId?: string;
}

export interface StartCreationButtonPropsType {
  startCreation: () => void;
  classes: string;
  hover: string;
}

export interface FinishCreationButtonPropsType {
  finishCreation: () => void;
  classes: string;
  hover: string;
}
