import useModal from "@/components/ui/modal/hooks/useModal";
import SharingButtonVector from "./assets/SharingButtonVector";
import Modal from "@/components/ui/modal/Modal";
import SharingPhase from "@/components/sharing/SharingPhase";
import HoverWrapper from "@/components/styles/HoverWrapper";

const OpenSharingModalButton = () => {
  const { modalIsOpened, openModal, closeModal } = useModal();
  return (
    <>
      <HoverWrapper classes="mr-[5vw] px-2 py-1">
        <button onClick={openModal}>
          <span className="flex justify-center items-center">
            <SharingButtonVector classes="w-10 h-10 inline-block" />
            <span className="ml-1 text-base">공유</span>
          </span>
        </button>
      </HoverWrapper>
      {modalIsOpened && (
        <Modal closeModal={closeModal}>
          <SharingPhase closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default OpenSharingModalButton;
