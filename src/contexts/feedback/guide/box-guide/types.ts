export interface BoxGuideContextType {
  unreadGuides: { guideId: string; boxId: string }[];

  addUnreadGuide: (guideId: string, boxId: string) => void;
  removeUnreadGuide: (guideId: string) => void;
  resetUnreadGuide: () => void;
}
