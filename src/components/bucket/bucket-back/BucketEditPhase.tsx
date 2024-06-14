import { ChangeEventHandler, useState } from "react";

import { BucketEditPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationEditBucket from "./bucket-controller/hooks/http/useMutationEditBucket";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useInputFocus from "@/shared/hooks/useInputFocus";

import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import { below15Letters, required, validate } from "@/shared/utils/validation";

// bucket을 수정하는 컴포넌트.
const BucketEditPhase = ({
  closeBucketEditPhase,
  bucketBackData,
}: BucketEditPhasePropsType) => {
  // bucket 수정을 위한 유저 입력을 관리하는 상태.
  const [userAnswers, setUserAnswers] = useState({
    title: bucketBackData.title!,
  });

  // bucket을 수정하는 비동기 요청이 담긴 커스텀 훅.
  // 여기서는 bucket을 수정하는 비동기 요청을 반환.
  const { mutateEditBucket } = useMutationEditBucket(bucketBackData.id);

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  // 유저가 유효하지 않은 입력을 할 때의 피드백을 관리하는 커스텀 훅.
  const { addInvalidBox } = useBoxValidationContext();

  // 유저 입력을 받는 요소가 자동으로 포커스되는 기능을 담당하는 커스텀 훅.
  const { inputRef } = useInputFocus();

  // 현재 컴포넌트에서의 유저 입력들 중, title을 업데이트하는 함수.
  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, title: event.target.value };
    });

  // bucket 수정을 최종적으로 서버에 제출하는 함수.
  const submitBucketEdit = () => {
    // 유효성 검사
    const validationResult = validate([
      required(userAnswers.title),
      below15Letters(userAnswers.title),
    ]);

    // 유효성 검사가 실패했을 때 에러 처리.
    if (!validationResult.isValid)
      return addInvalidBox(bucketBackData.id, validationResult.messages);

    // bucket 수정 비동기 요청이 시작 되었을 때, 로딩에 대한 피드백을 위해 호출.
    activate(bucketBackData.id);
    // bucket 수정 비동기 요청 호출.
    mutateEditBucket(userAnswers);
    // bucket 수정 종료.
    closeBucketEditPhase();
  };

  return (
    <>
      <div className="w-full h-[5.5rem] flex flex-col justify-end items-center gap-1">
        <div className="w-full flex justify-center">
          <input
            type="text"
            value={userAnswers.title}
            onChange={updateTitle}
            className="text-center caret-gray-400 outline-none"
            ref={inputRef}
          />
        </div>
      </div>
      <div className="absolute bottom-12 left-0 w-full flex justify-center">
        <p className="text-xs font-medium text-gray-300">버킷을 수정합니다</p>
      </div>
      <div className="absolute bottom-1 left-0 w-full flex justify-center">
        <CreationActionButton
          isInLastPhase={true}
          type={creationActionConstants.creationActionType.submit}
          actionHandler={submitBucketEdit}
          classes="w-6 h-6 inline-block"
          hover="p-1"
        />
      </div>
    </>
  );
};

export default BucketEditPhase;
