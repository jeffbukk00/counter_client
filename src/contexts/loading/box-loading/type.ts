/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

export interface BoxLoadingContextType {
  activatedBoxIds: string[];
  activate: (activatedBoxId: string) => void;
  inactivate: (inactivatedBoxId: string) => void;
}
