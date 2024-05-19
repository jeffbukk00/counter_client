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
      <span className="absolute top-2 right-2">
        <CloseModalButton closeModal={closeModal} />
      </span>
      <div className="w-full h-full flex flex-col justify-start items-center">
        <div className="w-4/5 h-2/5 border border-gray-300 mt-[10%]">
          <BucketSelectionList selectBucket={selectBucket} />
        </div>
        <div className="w-4/5 h-2/5 flex flex-col gap-3 justify-center items-center">
          <p>
            <span className="text-sm text-gray-300">카운터 </span>"
            {counterBackData.title}"
            <span className="text-sm text-gray-300">이</span>
          </p>
          <p>
            <span className="text-sm text-gray-300">버킷 </span>"
            {selectedBucket ? selectedBucket.title : ""}"
            <span className="text-sm text-gray-300">으로</span>
          </p>
          <p>
            <span className="text-sm text-gray-300">이동합니다</span>
          </p>
        </div>
      </div>
      <div className="absolute bottom-1 left-0 w-full flex justify-center items-center">
        <CreationActionButton
          isInLastPhase={true}
          type={creationActionConstants.creationActionType.submit}
          classes="w-7 h-7 inline-block"
          hover="p-1"
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
      </div>
    </>
  );
};

export default CounterMovePhase;
