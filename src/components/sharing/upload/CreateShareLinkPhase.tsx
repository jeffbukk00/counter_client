import { creationActionConstants } from "@/components/ui/creation-action/constants";
import { CreateShareLinkPhasePropsType } from "./types";

import useMutationUploadShareLink from "./hooks/http/useMutationUploadShareLink";
import useBucketSelection from "@/components/ui/bucket-selection/hooks/useBucketSelection";

import BucketSelectionList from "@/components/ui/bucket-selection/BucketSelectionList";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import { notNull, validate } from "@/shared/utils/validation";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";
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
  const { updateIsModalInvalid } = useNotBoxValidationContext();

  return (
    <>
      <BucketSelectionList selectBucket={selectBucket} />
      <p>
        선택하신 버킷
        {selectedBucket ? selectedBucket.title : "(버킷이 선택되지 않음)"}을
        공유합니다
      </p>
      <CreationActionButton
        isInLastPhase={false}
        type={creationActionConstants.creationActionType.click}
        actionHandler={() => {
          const validationResult = validate([notNull(selectedBucket)]);
          if (!validationResult.isValid)
            return updateIsModalInvalid(true, validationResult.messages);

          activateModal();
          mutateUploadShareLink(selectedBucket!.id);
        }}
      />
    </>
  );
};

export default CreateShareLinkPhase;
