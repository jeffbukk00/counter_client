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
    <div className="w-full h-full flex flex-col justify-start items-center">
      <div className="w-4/5 h-2/5 border border-gray-300 mt-[10%]">
        <BucketSelectionList selectBucket={selectBucket} />
      </div>
      <div className="w-4/5 h-2/5 flex flex-col gap-3 justify-center items-center">
        <p>
          <span className="text-sm text-gray-300">선택하신 버킷 </span>"
          {selectedBucket ? selectedBucket.title : ""}"
          <span className="text-sm text-gray-300">을</span>
        </p>
        <p>
          <span className="text-sm text-gray-300">공유합니다</span>
        </p>
      </div>
      <div className="absolute bottom-1 left-0 w-full flex justify-center items-center">
        <CreationActionButton
          isInLastPhase={false}
          type={creationActionConstants.creationActionType.click}
          classes="w-7 h-7 inline-block"
          hover="p-1"
          actionHandler={() => {
            const validationResult = validate([notNull(selectedBucket)]);
            if (!validationResult.isValid)
              return updateIsModalInvalid(true, validationResult.messages);

            activateModal();
            mutateUploadShareLink(selectedBucket!.id);
          }}
        />
      </div>
    </div>
  );
};

export default CreateShareLinkPhase;
