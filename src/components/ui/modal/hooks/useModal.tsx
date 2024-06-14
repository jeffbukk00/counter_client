import { useState } from "react";

// modal을 열지 닫을지에 대한 상태를 관리하는 커스텀 훅.
const useModal = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const openModal = () => setModalIsOpened(true);
  const closeModal = () => setModalIsOpened(false);

  return { modalIsOpened, openModal, closeModal };
};

export default useModal;
