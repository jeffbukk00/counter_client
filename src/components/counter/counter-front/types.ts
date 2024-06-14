/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

import { CounterDataType } from "../types";

export interface CounterFrontDataType extends CounterDataType {
  id: string;
}

export interface OnEndCountButtonPropsType {
  changeCountDisplayScreenType: (changedCountDisplayScreenType: number) => void;
  resetCurrentCount: () => void;
  counterId: string;
}

export interface CountDisplayPropsType {
  direction: number;
  currentCount: number;
  isInEndCount: boolean;
  getCloseToEndCount: (digit: number) => void;
  becomeDistantFromEndCount: (digit: number) => void;
  countDisplayScreenType: number;
}

export interface CountDigitPropsType {
  number: number;
  digit: number;
  direction: number;
  isInEndCount: boolean;
  getCloseToEndCount: (digit: number) => void;
  becomeDistantFromEndCount: (digit: number) => void;
}

export interface CountButtonPropsType {
  type: number;
  digit: number;
  direction: number;
  getCloseToEndCount: (digit: number) => void;
  becomeDistantFromEndCount: (digit: number) => void;
}

export interface CounterCirclePropsType {
  countCircleType: number;
  startCount: number;
  currentCount: number;
  endCount: number;
  direction: number;
}
