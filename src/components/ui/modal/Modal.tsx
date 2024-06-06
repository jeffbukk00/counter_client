import { createPortal } from "react-dom";

import { ModalPropsType } from "./types";

import BackDrop from "./Backdrop";
import CenterContainer from "../center/CenterContainer";
import CenterContainerWide from "../center/CenterContainerWide";

const Modal = ({ closeModal, isWide = false, children }: ModalPropsType) => {
  const content = (
    <>
      <BackDrop closeModal={closeModal} />
      {!isWide && <CenterContainer>{children}</CenterContainer>}
      {isWide && <CenterContainerWide>{children}</CenterContainerWide>}
    </>
  );

  return <>{createPortal(content, document.getElementById("overlay")!)}</>;
};

export default Modal;
