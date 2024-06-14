/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

export interface BoxValidationContextType {
  invalidBoxes: { id: string; messages: string[] }[];
  addInvalidBox: (invalidBoxId: string, messages: string[]) => void;
  removeInvalidBox: (invalidBoxIdx: number) => void;
}
