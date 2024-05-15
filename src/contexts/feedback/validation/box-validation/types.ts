export interface BoxValidationContextType {
  invalidBoxes: { id: string; messages: string[] }[];
  addInvalidBox: (invalidBoxId: string, messages: string[]) => void;
  removeInvalidBox: (invalidBoxIdx: number) => void;
}
