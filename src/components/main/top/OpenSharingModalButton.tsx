import useModal from "@/components/ui/modal/hooks/useModal";

import SharingButtonVector from "./assets/SharingButtonVector";
import Modal from "@/components/ui/modal/Modal";
import SharingPhase from "@/components/sharing/SharingPhase";
import HoverWrapper from "@/components/styles/HoverWrapper";

// 클릭하면 sharing을 위한 모달을 여는 버튼 컴포넌트.
const OpenSharingModalButton = () => {
  // modal의 사용을 위한 커스텀 훅.
  const { modalIsOpened, openModal, closeModal } = useModal();

  return (
    <>
      <HoverWrapper classes="mr-[5vw] px-2 py-1">
        <button
          onClick={
            // sharing을 위한 모달을 연다.
            openModal
          }
        >
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
