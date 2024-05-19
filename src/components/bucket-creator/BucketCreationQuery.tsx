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
          <div className="absolute bottom-12 left-0 w-full flex justify-center">
            <p className="text-xs font-medium">
              {
                bucketCreationConstants.bucketCreationPhaseQueryData
                  .lastPhaseComment
              }
            </p>
          </div>

          <div className="absolute bottom-1 left-0 w-full flex justify-center">
            <CreationActionButton
              isInLastPhase={isInLastPhase}
              type={creationActionConstants.creationActionType.submit}
              actionHandler={submitBucketCreation}
              classes="w-6 h-6 inline-block"
              hover="p-1"
            />
          </div>
        </>
      )}
      {!isInLastPhase && (
        <>
          <div className="absolute top-[50%] translate-y-[-50%] w-full h-8 flex justify-center items-center">
            <input
              type="text"
              placeholder={
                bucketCreationConstants.bucketCreationPhaseQueryData.placeholder
              }
              onChange={changeUserAnswerInCurrentPhase}
              onFocus={() => setQueryIsFocused(true)}
              onBlur={() => setQueryIsFocused(false)}
              value={userAnswerInCurrentPhase}
              className={`text-base outline-none text-center caret-gray-400 placeholder:text-gray-300 ${
                queryIsFocused ? "#232323" : "text-gray-300"
              }`}
            />
          </div>

          <div className="absolute top-[60%] w-full flex justify-center">
            <p
              className={`text-xs font-semibold ${
                queryIsFocused ? "text-gray-300" : "#232323"
              }`}
            >
              {
                bucketCreationConstants.bucketCreationPhaseQueryData.queries[
                  currentPhase
                ].queryText
              }
            </p>
          </div>

          <div className="absolute bottom-1 left-0 w-full flex justify-center">
            <CreationActionButton
              isInLastPhase={isInLastPhase}
              type={creationActionConstants.creationActionType.click}
              classes="w-6 h-6 inline-block"
              hover="p-1"
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
          </div>
        </>
      )}
    </>
  );
};

export default BucketCreationQuery;
