/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

export interface CountHistoryType {
  _id: string;
  offset: number;
  updatedCurrentCount: number;
  isPositive: boolean;
  isResetHistory: boolean;
  comment: string;
  timestamp: Date;
}
