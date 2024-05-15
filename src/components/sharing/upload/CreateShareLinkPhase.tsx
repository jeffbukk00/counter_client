import { creationActionConstants } from "@/components/ui/creation-action/constants";
import { CreateShareLinkPhasePropsType } from "./types";

import useMutationUploadShareLink from "./hooks/http/useMutationUploadShareLink";
import useBucketSelection from "@/components/ui/bucket-selection/hooks/useBucketSelection";

import BucketSelectionList from "@/components/ui/bucket-selection/BucketSelectionList";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

const CreateShareLinkPhase = ({
  gotoNextPhase,
  updateCreatedShareLink,
}: CreateShareLinkPhasePropsType) => {
  const { selectedBucket, selectBucket } = useBucketSelection();

  const onCreationSuccessHandler = (shareLink: string) => {
    updateCreatedShareLink(shareLink);
    gotoNextPhase();
  };

  const { mutateUploadShareLink } = useMutationUploadShareLink(
    onCreationSuccessHandler
  );

  const { activateModal } = useNotBoxLoadingContext();

  return (
    <>
      <BucketSelectionList selectBucket={selectBucket} />
      <p>선택하신 버킷 {selectedBucket.title}을 공유합니다</p>
      <CreationActionButton
        isInLastPhase={false}
        type={creationActionConstants.creationActionType.click}
        actionHandler={() => {
          activateModal();
          mutateUploadShareLink(selectedBucket.id);
        }}
      />
    </>
  );
};

export default CreateShareLinkPhase;
