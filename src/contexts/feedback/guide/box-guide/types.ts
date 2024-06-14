/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

export interface BoxGuideContextType {
  unreadGuides: { guideId: string; boxId: string }[];

  addUnreadGuide: (guideId: string, boxId: string) => void;
  removeUnreadGuide: (boxId: string, guideId: string) => void;
  resetUnreadGuide: () => void;
}
