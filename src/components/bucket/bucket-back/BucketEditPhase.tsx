import { ChangeEventHandler, useState } from "react";

import { BucketEditPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationEditBucket from "./bucket-controller/hooks/http/useMutationEditBucket";

import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import { below15Letters, required, validate } from "@/shared/utils/validation";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useInputFocus from "@/shared/hooks/useInputFocus";

const BucketEditPhase = ({
  closeBucketEditPhase,
  bucketBackData,
}: BucketEditPhasePropsType) => {
  const [userAnswers, setUserAnswers] = useState({
    title: bucketBackData.title!,
  });

  const { mutateEditBucket } = useMutationEditBucket(bucketBackData.id);
  const { activate } = useBoxLoadingContext();
  const { addInvalidBox } = useBoxValidationContext();

  const { inputRef } = useInputFocus();

  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, title: event.target.value };
    });

  const submitBucketEdit = () => {
    // 유효성 검사
    const validationResult = validate([
      required(userAnswers.title),
      below15Letters(userAnswers.title),
    ]);

    if (!validationResult.isValid)
      return addInvalidBox(bucketBackData.id, validationResult.messages);

    activate(bucketBackData.id);
    mutateEditBucket(userAnswers);
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
