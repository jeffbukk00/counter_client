import { ChangeEventHandler, useState } from "react";

import { CounterEditPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";

import useMutationEditCounter from "./counter-controller/hooks/http/useMutationEditCounter";

import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import {
  below15Letters,
  belowMax,
  currentCountIsInBetween,
  endCountisSame,
  isInteger,
  overMin,
  required,
  validate,
} from "@/shared/utils/validation";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";

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
  const { activate } = useBoxLoadingContext();
  const { addInvalidBox } = useBoxValidationContext();

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
    // title
    let validationResult = validate([
      required(userAnswers.title),
      below15Letters(userAnswers.title),
    ]);

    if (!validationResult.isValid)
      return addInvalidBox(counterBackData.id, validationResult.messages);
    // startCount
    validationResult = validate([
      required(userAnswers.startCount),
      isInteger(userAnswers.startCount),
    ]);
    if (!validationResult.isValid)
      return addInvalidBox(counterBackData.id, validationResult.messages);

    validationResult = validate([
      overMin(userAnswers.startCount),
      belowMax(userAnswers.startCount),
    ]);
    if (!validationResult.isValid)
      return addInvalidBox(counterBackData.id, validationResult.messages);

    // endCount
    validationResult = validate([
      required(userAnswers.endCount),
      isInteger(userAnswers.endCount),
    ]);
    if (!validationResult.isValid)
      return addInvalidBox(counterBackData.id, validationResult.messages);

    validationResult = validate([
      overMin(userAnswers.endCount),
      belowMax(userAnswers.endCount),
      endCountisSame(userAnswers.startCount, userAnswers.endCount),
      currentCountIsInBetween(
        counterBackData.currentCount,
        userAnswers.startCount,
        userAnswers.endCount
      ),
    ]);

    if (!validationResult.isValid)
      return addInvalidBox(counterBackData.id, validationResult.messages);

    activate(counterBackData.id);
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
