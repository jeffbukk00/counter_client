import { useState, useEffect, ChangeEventHandler, useRef } from "react";

import { CounterCreationQueryPropsType } from "./types";
import { counterCreationConstants } from "./constants";
import { creationActionConstants } from "../ui/creation-action/constants";

import CreationActionButton from "../ui/creation-action/CreationActionButton";
import {
  below15Letters,
  belowMax,
  endCountisSame,
  isInteger,
  overMin,
  required,
  validate,
} from "@/shared/utils/validation";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";

const CounterCreationQuery = ({
  currentPhase,
  isInLastPhase,
  userAnswers,
  updateUserAnswers,
  submitCounterCreation,
}: CounterCreationQueryPropsType) => {
  const [userAnswerInCurrentPhase, setUserAnswerInCurrentPhase] = useState("");
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
    if (currentPhase === 1 && userAnswers.startCount.length > 0) {
      setUserAnswerInCurrentPhase(userAnswers.startCount);
      setTypeIsStarted(true);
    }
    if (currentPhase === 2 && userAnswers.endCount.length > 0) {
      setUserAnswerInCurrentPhase(userAnswers.endCount);
      setTypeIsStarted(true);
    }
  }, [currentPhase, userAnswers]);

  useEffect(() => {
    if (currentPhase < 3 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentPhase]);
  return (
    <>
      {isInLastPhase && (
        <>
          <div className="absolute bottom-10 left-0 w-full flex justify-center">
            <p className="text-xs font-medium">
              {
                counterCreationConstants.counterCreationPhaseQueryData
                  .lastPhaseComment
              }
            </p>
          </div>

          <div className="absolute bottom-1 left-0 w-full flex justify-center">
            <CreationActionButton
              isInLastPhase={true}
              type={creationActionConstants.creationActionType.submit}
              actionHandler={submitCounterCreation}
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
                counterCreationConstants.counterCreationPhaseQueryData
                  .placeholder
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
                counterCreationConstants.counterCreationPhaseQueryData.queries[
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

                if (currentPhase === 1) {
                  let validationResult = validate([
                    required(userAnswerInCurrentPhase),
                    isInteger(userAnswerInCurrentPhase),
                  ]);
                  if (!validationResult.isValid)
                    return updateIsBoxCreatorInvalid(
                      true,
                      validationResult.messages
                    );

                  validationResult = validate([
                    overMin(userAnswerInCurrentPhase),
                    belowMax(userAnswerInCurrentPhase),
                  ]);
                  if (!validationResult.isValid)
                    return updateIsBoxCreatorInvalid(
                      true,
                      validationResult.messages
                    );
                }

                if (currentPhase === 2) {
                  let validationResult = validate([
                    required(userAnswerInCurrentPhase),
                    isInteger(userAnswerInCurrentPhase),
                  ]);
                  if (!validationResult.isValid)
                    return updateIsBoxCreatorInvalid(
                      true,
                      validationResult.messages
                    );

                  validationResult = validate([
                    overMin(userAnswerInCurrentPhase),
                    belowMax(userAnswerInCurrentPhase),
                    endCountisSame(
                      userAnswers.startCount,
                      userAnswerInCurrentPhase
                    ),
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

export default CounterCreationQuery;
