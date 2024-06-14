/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

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
