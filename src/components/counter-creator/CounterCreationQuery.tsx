import { useState, useEffect, ChangeEventHandler } from "react";

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
    if (currentPhase === 1 && userAnswers.title.length > 0) {
      setUserAnswerInCurrentPhase(userAnswers.startCount);
      setQueryIsFocused(true);
    }
    if (currentPhase === 2 && userAnswers.title.length > 0) {
      setUserAnswerInCurrentPhase(userAnswers.endCount);
      setQueryIsFocused(true);
    }
  }, [currentPhase, userAnswers]);

  return (
    <>
      {isInLastPhase && (
        <>
          <p>
            {
              counterCreationConstants.counterCreationPhaseQueryData
                .lastPhaseComment
            }
          </p>
          <CreationActionButton
            isInLastPhase={true}
            type={creationActionConstants.creationActionType.submit}
            actionHandler={submitCounterCreation}
          />
        </>
      )}
      {!isInLastPhase && (
        <>
          <input
            type="text"
            placeholder={
              counterCreationConstants.counterCreationPhaseQueryData.placeholder
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
              counterCreationConstants.counterCreationPhaseQueryData.queries[
                currentPhase
              ].queryText
            }
          </p>
          <CreationActionButton
            isInLastPhase={isInLastPhase}
            type={creationActionConstants.creationActionType.click}
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
              setQueryIsFocused(false);
              setUserAnswerInCurrentPhase("");
            }}
          />
        </>
      )}
    </>
  );
};

export default CounterCreationQuery;
