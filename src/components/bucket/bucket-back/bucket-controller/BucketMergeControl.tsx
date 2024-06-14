import { BucketBackData } from "./types";

import useModal from "@/components/ui/modal/hooks/useModal";

import Control from "@/components/ui/control/Control";
import MergeControlVector from "../../../ui/control/assets/MergeControlVector";
import Modal from "@/components/ui/modal/Modal";
import BucketMergePhase from "./BucketMergePhase";

// bucket의 controller의 control들 중, bucket 병합에 대한 control.
const BucketMergeControl = ({
  bucketBackData,
}: {
  bucketBackData: BucketBackData;
}) => {
  // modal의 사용을 위한 커스텀 훅.
  const { modalIsOpened, openModal, closeModal } = useModal();

  return (
    <>
      <Control
        title="병합"
        action={
          // 클릭하면, bucket 병합를 위한 페이즈를 modal에 담아서 띄움.
          openModal
        }
      >
        <MergeControlVector classes="w-5 h-5 inline-block" />
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
