import { CounterDataType } from "../types";

export interface CounterBackDataType extends CounterDataType {
  id: string;
  bucketId: string;
}

export interface CounterBackTopPropsType {
  currentCounterBackType: number;
  setCurrentCounterBackType: React.Dispatch<React.SetStateAction<number>>;
}

export interface ChangeCounterBackButtonPropsType {
  type: number;
  currentCounterBackType: number;
  setCurrentCounterBackType: React.Dispatch<React.SetStateAction<number>>;
}

export interface CounterBackBodyPropsType {
  currentCounterBackType: number;
  counterBackData: CounterBackDataType;
}

export interface CounterEditPhasePropsType {
  closeCounterEditPhase: () => void;
  counterBackData: CounterBackDataType;
}
