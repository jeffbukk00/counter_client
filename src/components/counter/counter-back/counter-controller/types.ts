import { CounterBackDataType } from "../types";

export interface CounterControllerPropsType {
  openCounterEditPhase: () => void;
  counterBackData: CounterBackDataType;
}

export interface CounterMovePhasePropsType {
  closeModal: () => void;
  counterBackData: CounterBackDataType;
}
