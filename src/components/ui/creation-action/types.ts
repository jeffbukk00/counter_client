export interface CreationActionButtonPropsType {
  isInLastPhase: boolean;
  type: number;
  actionHandler: () =>
    | void
    | (() => Promise<void>)
    | ((userAnswerInCurrentPhase: string) => void);
}
