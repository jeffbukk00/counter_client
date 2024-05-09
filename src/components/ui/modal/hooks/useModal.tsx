import { useState } from "react";

const useModal = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const openModal = () => setModalIsOpened(true);
  const closeModal = () => setModalIsOpened(false);

  return { modalIsOpened, openModal, closeModal };
};

export default useModal;
