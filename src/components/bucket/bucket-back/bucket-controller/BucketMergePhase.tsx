import { BucketMergePhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
import { isSameBucket, notNull, validate } from "@/shared/utils/validation";

import useMutationMergeBucket from "./hooks/http/useMutationMergeBucket";
import useBucketSelection from "@/components/ui/bucket-selection/hooks/useBucketSelection";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";

import CloseModalButton from "@/components/ui/modal/CloseModalButton";
import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import BucketSelectionList from "@/components/ui/bucket-selection/BucketSelectionList";

// bucket merge를 담당하는 페이즈.
const BucketMergePhase = ({
  closeModal,
  bucketBackData,
}: BucketMergePhasePropsType) => {
  // bucket 리스트 중에서, 선택 된 bucket을 관리하는 상태.
  const { selectedBucket, selectBucket } = useBucketSelection();

  // bucket merge에 대한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateMergeBucket } = useMutationMergeBucket(
    bucketBackData.id,
    closeModal
  );

  // box가 아닌 메인 요소(box-creator, modal)의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 modal이 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activateModal } = useNotBoxLoadingContext();

  // 유저가 유효하지 않은 입력을 할 시, 피드백을 위한 커스텀 훅.
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
            <span className="text-sm text-gray-300">버킷 </span>"
            {bucketBackData.title}"
            <span className="text-sm text-gray-300">이</span>
          </p>
          <p>
            <span className="text-sm text-gray-300">버킷 </span>"
            {selectedBucket ? selectedBucket.title : ""}"
            <span className="text-sm text-gray-300">을</span>
          </p>
          <p>
            <span className="text-sm text-gray-300">병합합니다</span>
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
            // 유저 입력에 대한 유효성 검사들 진행.

            // 유저 입력에 대한 유효성 검사 1.
            let validationResult = validate([notNull(selectedBucket)]);
            if (!validationResult.isValid)
              return updateIsModalInvalid(true, validationResult.messages);

            // 유저 입력에 대한 유효성 검사 2.
            validationResult = validate([
              isSameBucket(bucketBackData.id, selectedBucket!.id),
            ]);
            if (!validationResult.isValid)
              return updateIsModalInvalid(true, validationResult.messages);

            // bucket 병합에 대한 비동기 요청이 호출 되었을 때, 유저 피드백을 위해 호출.
            activateModal();
            // bucket 병합에 대한 비동기 요청을 호출.
            mutateMergeBucket(selectedBucket!.id);
          }}
        />
      </div>
    </>
  );
};

export default BucketMergePhase;
