import { useState, useEffect, ChangeEventHandler } from "react";

import { BucketCreationQueryPropsType } from "./types";
import { creationActionConstants } from "../ui/creation-action/constants";

import CreationActionButton from "../ui/creation-action/CreationActionButton";
import { bucketCreatorConstants } from "./constants";

const BucketCreationQuery = ({
  currentPhase,
  isInLastPhase,
  userAnswers,
  updateUserAnswers,
  submitBucketCreation,
}: BucketCreationQueryPropsType) => {
  const [userAnswerInCurrentPhase, setUserAnswerInCurrentPhase] =
    useState<string>("");
  const [queryIsFocused, setQueryIsFocused] = useState(false);

  const changeUserAnswerInCurrentPhase: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUserAnswerInCurrentPhase(event.target.value);
  };

  useEffect(() => {
    if (currentPhase === 0 && userAnswers.title.length > 0) {
      setUserAnswerInCurrentPhase(userAnswers.title);
      setQueryIsFocused(true);
    }
  }, [currentPhase, userAnswers]);
  return (
    <>
      {isInLastPhase && (
        <>
          <p>
            {
              bucketCreatorConstants.bucketCreationPhaseQueryData
                .lastPhaseComment
            }
          </p>
          <CreationActionButton
            isInLastPhase={isInLastPhase}
            type={creationActionConstants.creationActionType.submit}
            actionHandler={submitBucketCreation}
          />
        </>
      )}
      {!isInLastPhase && (
        <>
          <input
            type="text"
            placeholder={
              bucketCreatorConstants.bucketCreationPhaseQueryData.placeholder
            }
            onChange={changeUserAnswerInCurrentPhase}
            onFocus={() => setQueryIsFocused(true)}
            value={userAnswerInCurrentPhase}
            className={
              queryIsFocused ? "text-lg text-black" : "text-sm text-gray-400"
            }
          />
          <p
            className={
              queryIsFocused ? "text-sm text-gray-400" : "text-lg text-black"
            }
          >
            {
              bucketCreatorConstants.bucketCreationPhaseQueryData.queries[
                currentPhase
              ].queryText
            }
          </p>
          <CreationActionButton
            isInLastPhase={isInLastPhase}
            type={creationActionConstants.creationActionType.click}
            actionHandler={() => {
              updateUserAnswers(userAnswerInCurrentPhase);
              setQueryIsFocused(false);
              setUserAnswerInCurrentPhase("");
            }}
          />
        </>
      )}
    </>
  );
};

export default BucketCreationQuery;
