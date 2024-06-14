import { creationActionConstants } from "@/components/ui/creation-action/constants";
import { CreateShareLinkPhasePropsType } from "./types";
import { notNull, validate } from "@/shared/utils/validation";

import useMutationUploadShareLink from "./hooks/http/useMutationUploadShareLink";
import useBucketSelection from "@/components/ui/bucket-selection/hooks/useBucketSelection";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

import BucketSelectionList from "@/components/ui/bucket-selection/BucketSelectionList";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

// shareLink를 생성하는 페이즈.
const CreateShareLinkPhase = ({
  gotoNextPhase,
  updateCreatedShareLink,
}: CreateShareLinkPhasePropsType) => {
  // 모든 bucket들 중에서 공유할 bucket의 선택 여부를 관리하는 커스텀 훅.
  const { selectedBucket, selectBucket } = useBucketSelection();

  // shareLink 생성을 위한 비동기 요청이 성공한 이후 호출할 함수.
  const onCreationSuccessHandler = (shareLink: string) => {
    updateCreatedShareLink(shareLink);
    gotoNextPhase();
  };

  // shareLink 생성을 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateUploadShareLink } = useMutationUploadShareLink(
    onCreationSuccessHandler
  );

  // box가 아닌 메인 요소(box-creator, modal)의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 modal이 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activateModal } = useNotBoxLoadingContext();

  // 유저 입력이 유효하지 않을 경우에 대한 유저 피드백.
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
            // 유저 입력에 대한 유효성 검사.
            const validationResult = validate([notNull(selectedBucket)]);
            if (!validationResult.isValid)
              return updateIsModalInvalid(true, validationResult.messages);

            // shareLink 생성을 위한 비동기 요청이 호출되었을 때, 로딩 상태에 대한 유저 피드백.
            activateModal();

            // shareLink 생성을 위한 비동기 요청이 호출.
            mutateUploadShareLink(selectedBucket!.id);
          }}
        />
      </div>
    </div>
  );
};

export default CreateShareLinkPhase;
