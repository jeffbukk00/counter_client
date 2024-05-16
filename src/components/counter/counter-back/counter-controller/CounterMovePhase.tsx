import { CounterMovePhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useBucketSelection from "@/components/ui/bucket-selection/hooks/useBucketSelection";
import useMutationMoveCounter from "./hooks/http/useMutationMoveCounter";

import CloseModalButton from "@/components/ui/modal/CloseModalButton";
import BucketSelectionList from "@/components/ui/bucket-selection/BucketSelectionList";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import { isSameBucket, notNull, validate } from "@/shared/utils/validation";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";

const CounterMovePhase = ({
  closeModal,
  counterBackData,
}: CounterMovePhasePropsType) => {
  const { mutateMoveCounter } = useMutationMoveCounter(
    counterBackData.bucketId,
    counterBackData.id,
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
        카운터 {counterBackData.title}이 버킷
        {selectedBucket ? selectedBucket.title : "(버킷이 선택되지 않음)"}으로
        이동합니다
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
            isSameBucket(counterBackData.bucketId, selectedBucket!.id),
          ]);
          if (!validationResult.isValid)
            return updateIsModalInvalid(true, validationResult.messages);

          activateModal();
          mutateMoveCounter(selectedBucket!.id);
        }}
      />
    </>
  );
};

export default CounterMovePhase;
