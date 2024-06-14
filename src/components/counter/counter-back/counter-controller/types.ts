/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

import { CounterBackDataType } from "../types";

export interface CounterControllerPropsType {
  openCounterEditPhase: () => void;
  counterBackData: CounterBackDataType;
}

export interface CounterMovePhasePropsType {
  closeModal: () => void;
  counterBackData: CounterBackDataType;
}
