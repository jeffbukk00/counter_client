/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

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
