export interface CreationActionButtonPropsType {
  isInLastPhase: boolean;
  type: number;
  actionHandler: () => void | ((userAnswerInCurrentPhase: string) => void);
}
