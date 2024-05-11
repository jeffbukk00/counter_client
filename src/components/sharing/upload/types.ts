export interface CreateShareLinkPhasePropsType {
  gotoNextPhase: () => void;
  updateCreatedShareLink: (createdShareLink: string) => void;
}

export interface GeneratedShareLinkPhasePropsType {
  createdShareLink: string;
  closeModal: () => void;
}
