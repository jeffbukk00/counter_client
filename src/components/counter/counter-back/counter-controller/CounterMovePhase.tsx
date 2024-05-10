import { CounterMovePhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useBucketSelection from "@/components/ui/bucket-selection/hooks/useBucketSelection";
import useMutationMoveCounter from "./hooks/http/useMutationMoveCounter";

import CloseModalButton from "@/components/ui/modal/CloseModalButton";
import BucketSelectionList from "@/components/ui/bucket-selection/BucketSelectionList";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

const CounterMovePhase = ({
  closeModal,
  counterBackData,
}: CounterMovePhasePropsType) => {
  const { mutateMoveCounter } = useMutationMoveCounter(
    counterBackData.bucketId,
    counterBackData.id
  );
  const { selectedBucket, selectBucket } = useBucketSelection();
  return (
    <>
      <CloseModalButton closeModal={closeModal} />
      <BucketSelectionList selectBucket={selectBucket} />
      <p>
        카운터 {counterBackData.title}이 버킷 {selectedBucket.title}로
        이동합니다
      </p>
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={() => mutateMoveCounter(selectedBucket.id)}
      />
    </>
  );
};

export default CounterMovePhase;
