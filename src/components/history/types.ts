export interface HistoryMainPropsType {
  counterId: string;
  title: string;
  closeModal: () => void;
}

export interface HistoryTopbarPropsType {
  changeHistoryType: (historyType: number) => void;
  title: string;
  closeModal: () => void;
}
