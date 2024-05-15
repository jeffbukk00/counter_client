export interface BoxLoadingContextType {
  activatedBoxIds: string[];
  activate: (activatedBoxId: string) => void;
  inactivate: (inactivatedBoxId: string) => void;
}
