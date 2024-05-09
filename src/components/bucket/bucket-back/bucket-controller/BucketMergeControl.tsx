import { BucketBackData } from "./types";

import useModal from "@/components/ui/modal/hooks/useModal";

import Control from "@/components/ui/control/Control";
import BucketMergeControlVector from "./assets/BucketMergeControlVector";
import Modal from "@/components/ui/modal/Modal";
import BucketMergePhase from "./BucketMergePhase";

const BucketMergeControl = ({
  bucketBackData,
}: {
  bucketBackData: BucketBackData;
}) => {
  const { modalIsOpened, openModal, closeModal } = useModal();

  return (
    <>
      <Control title="병합" action={openModal}>
        <BucketMergeControlVector />
      </Control>
      {modalIsOpened && (
        <Modal closeModal={closeModal}>
          <BucketMergePhase
            closeModal={closeModal}
            bucketBackData={bucketBackData}
          />
        </Modal>
      )}
    </>
  );
};

export default BucketMergeControl;
