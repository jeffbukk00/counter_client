import { useState } from "react";

import { CounterCreationPhasePropsType, UserAnswersStateType } from "./types";
import { counterCreationConstants } from "./constants";

import useMutationCreateCounter from "./hooks/http/useMutationCreateCounter";
import useNavigator from "../ui/navigator/hooks/useNavigator";

import FinishCreationButton from "../ui/box-creator/FinishCreationButton";
import GotoPrevPhaseButton from "../ui/navigator/GotoPrevPhaseButton";
import CounterCreationAnswerList from "./CounterCreationAnswerList";
import CounterCreationQuery from "./CounterCreationQuery";

const CounterCreationPhase = ({
  finishCreation,
  bucketId,
}: CounterCreationPhasePropsType) => {
  const [userAnswers, setUserAnswers] = useState<UserAnswersStateType>({
    title: "",
    startCount: "",
    endCount: "",
  });

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
      // "title"에 대한 유효성 검사

      setUserAnswers((prev) => {
        return { ...prev, title: userAnswerInCurrentPhase };
      });
    }

    if (currentPhase === 1) {
      // "startCount"에 대한 유효성 검사

      setUserAnswers((prev) => {
        return { ...prev, startCount: userAnswerInCurrentPhase };
      });
    }

    if (currentPhase === 2) {
      // "endCount"에 대한 유효성 검사

      setUserAnswers((prev) => {
        return { ...prev, endCount: userAnswerInCurrentPhase };
      });
    }

    gotoNextPhase();
  };

  const submitCounterCreation = () => {
    mutateCreateCounter({
      title: userAnswers.title,
      startCount: Number(userAnswers.startCount),
      endCount: Number(userAnswers.endCount),
    });
    finishCreation();
  };

  return (
    <>
      <FinishCreationButton finishCreation={finishCreation} />
      {!isInFirstPhase && <GotoPrevPhaseButton gotoPrevPhase={gotoPrevPhase} />}
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
