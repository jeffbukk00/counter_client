import useModal from "@/components/ui/modal/hooks/useModal";
import SharingButtonVector from "./assets/SharingButtonVector";
import Modal from "@/components/ui/modal/Modal";
import SharingPhase from "@/components/sharing/SharingPhase";

const OpenSharingModalButton = () => {
  const { modalIsOpened, openModal, closeModal } = useModal();
  return (
    <>
      <button onClick={openModal}>
        <SharingButtonVector />
        <span>공유</span>
      </button>
      {modalIsOpened && (
        <Modal closeModal={closeModal}>
          <SharingPhase closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default OpenSharingModalButton;
