import { CounterBackDataType } from "../types";

import useModal from "@/components/ui/modal/hooks/useModal";

import Control from "@/components/ui/control/Control";
import MoveControlVector from "@/components/ui/control/assets/MoveControlVector";
import Modal from "@/components/ui/modal/Modal";
import CounterMovePhase from "./CounterMovePhase";

const CounterMoveControl = ({
  counterBackData,
}: {
  counterBackData: CounterBackDataType;
}) => {
  const { modalIsOpened, openModal, closeModal } = useModal();

  return (
    <>
      <Control title="이동" action={openModal}>
        <MoveControlVector />
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
