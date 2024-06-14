import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

import useModal from "@/components/ui/modal/hooks/useModal";
import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";

import HistoryMain from "@/components/history/HistoryMain";
import Modal from "@/components/ui/modal/Modal";

// counter의 history를 확인할 수 있는 modal 창을 여는 페이즈. 이를 위한 버튼 컴포넌트.
const OpenCounterHistoryPhase = ({
  counterId,
  title,
}: {
  counterId: string;
  title: string;
}) => {
  // modal의 사용을 위한 커스텀 훅.
  const { modalIsOpened, openModal, closeModal } = useModal();

  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useBoxGuide(guideConstants.guideIds["guideId13"], counterId);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <button
        onClick={
          // count의 history를 확인하기 위한 모달 열기
          openModal
        }
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
