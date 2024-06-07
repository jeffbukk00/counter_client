import HistoryMain from "@/components/history/HistoryMain";
import useModal from "@/components/ui/modal/hooks/useModal";
import Modal from "@/components/ui/modal/Modal";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";
import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";

const OpenCounterHistoryPhase = ({
  counterId,
  title,
}: {
  counterId: string;
  title: string;
}) => {
  const { modalIsOpened, openModal, closeModal } = useModal();

  useBoxGuide(guideConstants.guideIds["guideId13"], counterId);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <button
        onClick={openModal}
        className="p-3 border border-gray-300 rounded-2xl tracking-tight transition-colors duration-200 ease-in hover:bg-gray-100"
      >
        <span className="text-base font-semibold">"{title}"</span>의 히스토리
        열기
      </button>

      {modalIsOpened && (
        <Modal closeModal={closeModal} isWide={true}>
          <HistoryMain
            counterId={counterId}
            title={title}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default OpenCounterHistoryPhase;
