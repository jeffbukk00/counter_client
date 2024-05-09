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
