/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

export interface BucketCreationPhasePropsType {
  finishCreation: () => void;
}

export interface UserAnswersStateType {
  title: string;
}

export interface BucketDataType {
  title: string;
}

export interface BucketCreationAnswerListPropsType {
  currentPhase: number;
  isInLastPhase: boolean;
  userAnswers: UserAnswersStateType;
}

export interface BucketCreationQueryPropsType {
  currentPhase: number;
  isInLastPhase: boolean;
  userAnswers: UserAnswersStateType;
  updateUserAnswers: (userAnswerInCurrentPhase: string) => void;
  submitBucketCreation: () => void;
}
