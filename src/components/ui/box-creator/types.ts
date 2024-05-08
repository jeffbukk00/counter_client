export interface BoxCreatorPropsType {
  boxCreatorType: number;
  bucketId?: string;
}

export interface StartCreationButtonPropsType {
  startCreation: () => void;
}

export interface FinishCreationButtonPropsType {
  finishCreation: () => void;
}
