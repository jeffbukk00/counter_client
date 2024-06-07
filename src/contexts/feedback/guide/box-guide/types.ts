export interface BoxGuideContextType {
  unreadGuides: { guideId: string; boxId: string }[];

  addUnreadGuide: (guideId: string, boxId: string) => void;
  removeUnreadGuide: (boxId: string, guideId: string) => void;
  resetUnreadGuide: () => void;
}
