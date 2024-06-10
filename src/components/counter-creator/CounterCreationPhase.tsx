import { useState } from "react";

import { CounterCreationPhasePropsType, UserAnswersStateType } from "./types";
import { counterCreationConstants } from "./constants";

import useMutationCreateCounter from "./hooks/http/useMutationCreateCounter";
import useNavigator from "../ui/navigator/hooks/useNavigator";

import FinishCreationButton from "../ui/creator/FinishCreationButton";
import GotoPrevPhaseButton from "../ui/navigator/GotoPrevPhaseButton";
import CounterCreationAnswerList from "./CounterCreationAnswerList";
import CounterCreationQuery from "./CounterCreationQuery";

import useBoxCreatorGuide from "../ui/user-feedback/guide/hooks/useBoxCreatorGuide";
import { guideConstants } from "../ui/user-feedback/guide/constants";

import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

const CounterCreationPhase = ({
  finishCreation,
  bucketId,
}: CounterCreationPhasePropsType) => {
  const [userAnswers, setUserAnswers] = useState<UserAnswersStateType>({
    title: "",
    startCount: "",
    endCount: "",
  });
  useBoxCreatorGuide(guideConstants.guideIds["guideId5"]);

  const { activateBoxCreator } = useNotBoxLoadingContext();
  const { mutateCreateCounter } = useMutationCreateCounter(bucketId);

  const {
    currentPhase,
    isInFirstPhase,
    isInLastPhase,
    gotoPrevPhase,
    gotoNextPhase,
  } = useNavigator(
    counterCreationConstants.counterCreationPhase.first,
    counterCreationConstants.counterCreationPhase.last
  );

  const updateUserAnswers = (userAnswerInCurrentPhase: string) => {
    if (currentPhase === 0) {
      setUserAnswers((prev) => {
        return { ...prev, title: userAnswerInCurrentPhase };
      });
    }

    if (currentPhase === 1) {
      setUserAnswers((prev) => {
        return { ...prev, startCount: userAnswerInCurrentPhase };
      });
    }

    if (currentPhase === 2) {
      setUserAnswers((prev) => {
        return { ...prev, endCount: userAnswerInCurrentPhase };
      });
    }

    gotoNextPhase();
  };

  const submitCounterCreation = () => {
    activateBoxCreator();
    mutateCreateCounter({
      title: userAnswers.title,
      startCount: Number(userAnswers.startCount),
      endCount: Number(userAnswers.endCount),
    });
    finishCreation();
  };

  return (
    <>
      <span className="absolute top-1 right-1">
        <FinishCreationButton
          finishCreation={finishCreation}
          classes="w-5 h-5 inline-block"
          hover="p-[2px]"
        />
      </span>

      {!isInFirstPhase && (
        <span className="absolute top-[50%] -left-10 translate-y-[-50%]">
          <GotoPrevPhaseButton
            classes="sm:w-7 sm:h-7 w-6 h-6 inline-block "
            gotoPrevPhase={gotoPrevPhase}
          />
        </span>
      )}
      <CounterCreationAnswerList
        currentPhase={currentPhase}
        isInLastPhase={isInLastPhase}
        userAnswers={userAnswers}
      />
      <CounterCreationQuery
        currentPhase={currentPhase}
        isInLastPhase={isInLastPhase}
        userAnswers={userAnswers}
        updateUserAnswers={updateUserAnswers}
        submitCounterCreation={submitCounterCreation}
      />
    </>
  );
};

export default CounterCreationPhase;
