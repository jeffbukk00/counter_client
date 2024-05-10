import { ChangeEventHandler, useState } from "react";

import { CounterEditPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationEditCounter from "./counter-controller/hooks/http/useMutationEditCounter";

import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

const CounterEditPhase = ({
  closeCounterEditPhase,
  counterBackData,
}: CounterEditPhasePropsType) => {
  const [userAnswers, setUserAnswers] = useState({
    title: counterBackData.title,
    startCount: counterBackData.startCount.toString(),
    endCount: counterBackData.endCount.toString(),
  });

  const { mutateEditCounter } = useMutationEditCounter(counterBackData.id);

  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserAnswers((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  const updateStartCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserAnswers((prev) => {
      return { ...prev, startCount: event.target.value };
    });
  };

  const updateEndCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserAnswers((prev) => {
      return { ...prev, endCount: event.target.value };
    });
  };

  const submitCounterEdit = () => {
    // 유효성 검사

    mutateEditCounter({
      title: userAnswers.title,
      startCount: Number(userAnswers.startCount),
      endCount: Number(userAnswers.endCount),
    });
    closeCounterEditPhase();
  };
  return (
    <>
      <input type="text" value={userAnswers.title} onChange={updateTitle} />
      <input
        type="text"
        value={userAnswers.startCount}
        onChange={updateStartCount}
      />
      <input
        type="text"
        value={userAnswers.endCount}
        onChange={updateEndCount}
      />
      <p>카운터를 수정합니다</p>
      <CreationActionButton
        isInLastPhase={true}
        type={creationActionConstants.creationActionType.submit}
        actionHandler={submitCounterEdit}
      />
    </>
  );
};

export default CounterEditPhase;
