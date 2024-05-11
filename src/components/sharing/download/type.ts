export interface PasteShareLinkPhasePropsType {
  gotoNextPhase: () => void;
  updateDownloadLink: (downloadLink: string) => void;
  updateUsername: (username: string) => void;
}

export interface ConfirmDownloadPhasePropsType {
  username: string;
  gotoNextPhase: () => void;
  closeModal: () => void;
}

export interface ReconfirmDownloadPhasePropsType {
  username: string;
  downloadLink: string;
  closeModal: () => void;
}
