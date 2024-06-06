import HistoryMain from "@/components/history/HistoryMain";
import useModal from "@/components/ui/modal/hooks/useModal";
import Modal from "@/components/ui/modal/Modal";

const OpenCounterHistoryPhase = ({
  counterId,
  title,
}: {
  counterId: string;
  title: string;
}) => {
  const { modalIsOpened, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={openModal}>"{title}"의 히스토리 열기</button>
      {modalIsOpened && (
        <Modal closeModal={closeModal} isWide={true}>
          <HistoryMain
            counterId={counterId}
            title={title}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default OpenCounterHistoryPhase;
