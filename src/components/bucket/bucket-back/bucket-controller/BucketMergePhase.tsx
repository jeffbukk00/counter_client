import { BucketMergePhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationMergeBucket from "./hooks/http/useMutationMergeBucket";
import useBucketSelection from "@/components/ui/bucket-selection/hooks/useBucketSelection";

import CloseModalButton from "@/components/ui/modal/CloseModalButton";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import BucketSelectionList from "@/components/ui/bucket-selection/BucketSelectionList";

const BucketMergePhase = ({
  closeModal,
  bucketBackData,
}: BucketMergePhasePropsType) => {
  const { mutateMergeBucket } = useMutationMergeBucket(bucketBackData.id);
  const { selectedBucket, selectBucket } = useBucketSelection();

  return (
    <>
      <CloseModalButton closeModal={closeModal} />
      <BucketSelectionList selectBucket={selectBucket} />
      <p>
        버킷 {bucketBackData.title}이 버킷 {selectedBucket.title}을 병합합니다
      </p>
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={() => {
          mutateMergeBucket(selectedBucket.id);
          closeModal();
        }}
      />
    </>
  );
};

export default BucketMergePhase;
