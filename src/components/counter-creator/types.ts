/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

export interface UserAnswersStateType {
  title: string;
  startCount: string;
  endCount: string;
}

export interface CounterCreationPhasePropsType {
  finishCreation: () => void;
  bucketId: string;
}

export interface CounterCreationQueryPropsType {
  currentPhase: number;
  isInLastPhase: boolean;
  userAnswers: UserAnswersStateType;
  updateUserAnswers: (userAnswerInCurrentPhase: string) => void;
  submitCounterCreation: () => void;
}

export interface CounterCreationAnswerListPropsType {
  currentPhase: number;
  isInLastPhase: boolean;
  userAnswers: UserAnswersStateType;
}
