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
