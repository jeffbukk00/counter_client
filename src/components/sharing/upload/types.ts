/*
  같은 디렉토리 위치에 있는 컴포넌트 등에서 사용하는 타입들.
*/

export interface CreateShareLinkPhasePropsType {
  gotoNextPhase: () => void;
  updateCreatedShareLink: (createdShareLink: string) => void;
}

export interface GeneratedShareLinkPhasePropsType {
  createdShareLink: string;
  closeModal: () => void;
}
