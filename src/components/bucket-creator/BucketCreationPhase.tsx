import { useState } from "react";

import { BucketCreationPhasePropsType, UserAnswersStateType } from "./types";
import { bucketCreationConstants } from "./constants";

import useMutationCreateBuckets from "./hooks/http/useMutationCreateBucket";
import useNavigator from "../ui/navigator/hooks/useNavigator";

import FinishCreationButton from "../ui/creator/FinishCreationButton";
import GotoPrevPhaseButton from "../ui/navigator/GotoPrevPhaseButton";
import BucketCreationAnswerList from "./BucketCreationAnswerList";
import BucketCreationQuery from "./BucketCreationQuery";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
const BucketCreationPhase = ({
  finishCreation,
}: BucketCreationPhasePropsType) => {
  const [userAnswers, setUserAnswers] = useState<UserAnswersStateType>({
    title: "",
  });

  const { activateBoxCreator } = useNotBoxLoadingContext();
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
    setUserAnswers((prev) => {
      return { ...prev, title: userAnswerInCurrentPhase };
    });
    gotoNextPhase();
  };

  const submitBucketCreation = () => {
    activateBoxCreator();
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
