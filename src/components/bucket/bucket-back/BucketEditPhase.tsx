import { ChangeEventHandler, useState } from "react";

import { BucketEditPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationEditBucket from "./bucket-controller/hooks/http/useMutationEditBucket";

import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

const BucketEditPhase = ({
  closeBucketEditPhase,
  bucketBackData,
}: BucketEditPhasePropsType) => {
  const [userAnswers, setUserAnswers] = useState({
    title: bucketBackData.title!,
  });

  const { mutateEditBucket } = useMutationEditBucket(bucketBackData.id);

  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUserAnswers((prev) => {
      return { ...prev, title: event.target.value };
    });

  const submitBucketEdit = () => {
    // 유효성 검사
    mutateEditBucket(userAnswers);
    closeBucketEditPhase();
  };

  return (
    <>
      <input type="text" value={userAnswers.title} onChange={updateTitle} />
      <p>버킷을 수정합니다</p>
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={submitBucketEdit}
      />
    </>
  );
};

export default BucketEditPhase;
