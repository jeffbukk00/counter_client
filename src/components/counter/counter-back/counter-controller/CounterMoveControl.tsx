import { CounterBackDataType } from "../types";

import useModal from "@/components/ui/modal/hooks/useModal";

import Control from "@/components/ui/control/Control";
import MoveControlVector from "@/components/ui/control/assets/MoveControlVector";
import Modal from "@/components/ui/modal/Modal";
import CounterMovePhase from "./CounterMovePhase";

// controller의 control들 중, counter 이동을 위한 control.
const CounterMoveControl = ({
  counterBackData,
}: {
  counterBackData: CounterBackDataType;
}) => {
  // modal의 사용을 위한 커스텀 훅.
  const { modalIsOpened, openModal, closeModal } = useModal();

  return (
    <>
      <Control
        title="이동"
        action={
          // counter 이동을 위한 모달을 연다.
          openModal
        }
      >
        <MoveControlVector classes="w-5 h-5 inline-block" />
      </Control>
      {modalIsOpened && (
        <Modal closeModal={closeModal}>
          <CounterMovePhase
            closeModal={closeModal}
            counterBackData={counterBackData}
          />
        </Modal>
      )}
    </>
  );
};

export default CounterMoveControl;
