import { BucketMergePhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationMergeBucket from "./hooks/http/useMutationMergeBucket";
import useBucketSelection from "@/components/ui/bucket-selection/hooks/useBucketSelection";

import CloseModalButton from "@/components/ui/modal/CloseModalButton";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import BucketSelectionList from "@/components/ui/bucket-selection/BucketSelectionList";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import { isSameBucket, notNull, validate } from "@/shared/utils/validation";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";

const BucketMergePhase = ({
  closeModal,
  bucketBackData,
}: BucketMergePhasePropsType) => {
  const { mutateMergeBucket } = useMutationMergeBucket(
    bucketBackData.id,
    closeModal
  );
  const { selectedBucket, selectBucket } = useBucketSelection();
  const { activateModal } = useNotBoxLoadingContext();
  const { updateIsModalInvalid } = useNotBoxValidationContext();

  return (
    <>
      <CloseModalButton closeModal={closeModal} />
      <BucketSelectionList selectBucket={selectBucket} />
      <p>
        버킷 {bucketBackData.title}이 버킷{" "}
        {selectedBucket ? selectedBucket.title : "(버킷이 선택되지 않음)"}을
        병합합니다
      </p>
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={() => {
          // 유효성 검사

          let validationResult = validate([notNull(selectedBucket)]);
          if (!validationResult.isValid)
            return updateIsModalInvalid(true, validationResult.messages);

          validationResult = validate([
            isSameBucket(bucketBackData.id, selectedBucket!.id),
          ]);
          if (!validationResult.isValid)
            return updateIsModalInvalid(true, validationResult.messages);

          activateModal();
          mutateMergeBucket(selectedBucket!.id);
        }}
      />
    </>
  );
};

export default BucketMergePhase;
