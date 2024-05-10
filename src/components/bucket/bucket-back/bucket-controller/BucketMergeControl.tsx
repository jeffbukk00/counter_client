import { BucketBackData } from "./types";

import useModal from "@/components/ui/modal/hooks/useModal";

import Control from "@/components/ui/control/Control";
import MergeControlVector from "../../../ui/control/assets/MergeControlVector";
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
        <MergeControlVector />
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
