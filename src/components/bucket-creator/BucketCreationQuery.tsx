import { useState, useEffect, ChangeEventHandler, useRef } from "react";

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
  const [typeIsStarted, setTypeIsStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { updateIsBoxCreatorInvalid } = useNotBoxValidationContext();

  const changeUserAnswerInCurrentPhase: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUserAnswerInCurrentPhase(event.target.value);
  };

  useEffect(() => {
    if (currentPhase === 0 && userAnswers.title.length > 0) {
      setUserAnswerInCurrentPhase(userAnswers.title);
      setTypeIsStarted(true);
    }
  }, [currentPhase, userAnswers]);

  useEffect(() => {
    if (currentPhase === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentPhase]);
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
              onChange={(event) => {
                if (event.target.value.length <= 0) {
                  setTypeIsStarted(false);
                } else {
                  setTypeIsStarted(true);
                }
                changeUserAnswerInCurrentPhase(event);
              }}
              value={userAnswerInCurrentPhase}
              className={`text-base outline-none text-center caret-gray-400 placeholder:text-gray-300 ${
                typeIsStarted ? "#232323" : "text-gray-300"
              }`}
              ref={inputRef}
            />
          </div>

          <div className="absolute top-[60%] w-full flex justify-center">
            <p
              className={`text-xs font-semibold ${
                typeIsStarted ? "text-gray-300" : "#232323"
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
                setTypeIsStarted(false);
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
