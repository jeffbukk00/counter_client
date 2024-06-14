/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

export interface CounterPropsType {
  counterId: string;
  bucketId: string;
  isFront: boolean;
}

export interface CounterDataType {
  title: string;
  startCount: number;
  currentCount: number;
  endCount: number;
  direction: number;
  achievementStack: number;
}
