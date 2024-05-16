import { useState, useEffect, ChangeEventHandler } from "react";

import { BucketCreationQueryPropsType } from "./types";
import { creationActionConstants } from "../ui/creation-action/constants";
import { bucketCreationConstants } from "./constants";

import CreationActionButton from "../ui/creation-action/CreationActionButton";
import { below15Letters, required, validate } from "@/shared/utils/validation";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";

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

  const { updateIsBoxCreatorInvalid } = useNotBoxValidationContext();

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
              bucketCreationConstants.bucketCreationPhaseQueryData
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
              bucketCreationConstants.bucketCreationPhaseQueryData.placeholder
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
              bucketCreationConstants.bucketCreationPhaseQueryData.queries[
                currentPhase
              ].queryText
            }
          </p>
          <CreationActionButton
            isInLastPhase={isInLastPhase}
            type={creationActionConstants.creationActionType.click}
            actionHandler={() => {
              if (currentPhase === 0) {
                // 유효성 검사
                const validationResult = validate([
                  required(userAnswerInCurrentPhase),
                  below15Letters(userAnswerInCurrentPhase),
                ]);

                if (!validationResult.isValid)
                  return updateIsBoxCreatorInvalid(
                    true,
                    validationResult.messages
                  );
              }

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
