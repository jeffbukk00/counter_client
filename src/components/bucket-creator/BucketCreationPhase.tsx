import { useState } from "react";

import { BucketCreationPhasePropsType, UserAnswersStateType } from "./types";
import { bucketCreationConstants } from "./constants";

import useMutationCreateBuckets from "./hooks/http/useMutationCreateBucket";
import useNavigator from "../ui/navigator/hooks/useNavigator";

import FinishCreationButton from "../ui/creator/FinishCreationButton";
import GotoPrevPhaseButton from "../ui/navigator/GotoPrevPhaseButton";
import BucketCreationAnswerList from "./BucketCreationAnswerList";
import BucketCreationQuery from "./BucketCreationQuery";

const BucketCreationPhase = ({
  finishCreation,
}: BucketCreationPhasePropsType) => {
  const [userAnswers, setUserAnswers] = useState<UserAnswersStateType>({
    title: "",
  });

  const { mutateCreateBucket } = useMutationCreateBuckets();
  const {
    currentPhase,
    isInFirstPhase,
    isInLastPhase,
    gotoPrevPhase,
    gotoNextPhase,
  } = useNavigator(
    bucketCreationConstants.bucketCreationPhase.first,
    bucketCreationConstants.bucketCreationPhase.last
  );

  const updateUserAnswers = (userAnswerInCurrentPhase: string) => {
    if (currentPhase === 0) {
      // 유효성 검사

      setUserAnswers((prev) => {
        return { ...prev, title: userAnswerInCurrentPhase };
      });
    }
    gotoNextPhase();
  };

  const submitBucketCreation = () => {
    mutateCreateBucket(userAnswers);
    finishCreation();
  };

  return (
    <>
      <FinishCreationButton finishCreation={finishCreation} />
      {!isInFirstPhase && <GotoPrevPhaseButton gotoPrevPhase={gotoPrevPhase} />}
      <BucketCreationAnswerList
        currentPhase={currentPhase}
        isInLastPhase={isInLastPhase}
        userAnswers={userAnswers}
      />
      <BucketCreationQuery
        currentPhase={currentPhase}
        isInLastPhase={isInLastPhase}
        userAnswers={userAnswers}
        updateUserAnswers={updateUserAnswers}
        submitBucketCreation={submitBucketCreation}
      />
    </>
  );
};

export default BucketCreationPhase;
