import { createPortal } from "react-dom";

import { ModalPropsType } from "./types";

import BackDrop from "./Backdrop";
import CenterContainer from "../CenterContainer";

const Modal = ({ closeModal, children }: ModalPropsType) => {
  const content = (
    <>
      <BackDrop closeModal={closeModal} />
      <CenterContainer>{children}</CenterContainer>
    </>
  );

  return <>{createPortal(content, document.getElementById("overlay")!)}</>;
};

export default Modal;
