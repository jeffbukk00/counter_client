import { ChangeEventHandler, useState } from "react";

import { CounterEditPhasePropsType } from "./types";
import { creationActionConstants } from "@/components/ui/creation-action/constants";
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

import useMutationEditCounter from "./counter-controller/hooks/http/useMutationEditCounter";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import useInputFocus from "@/shared/hooks/useInputFocus";

import CreationActionButton from "@/components/ui/creation-action/CreationActionButton";

// counter 수정을 담당하는 페이즈.
const CounterEditPhase = ({
  closeCounterEditPhase,
  counterBackData,
}: CounterEditPhasePropsType) => {
  // counter 수정을 위한 유저 입력들을 관리하는 상태.
  const [userAnswers, setUserAnswers] = useState({
    title: counterBackData.title,
    startCount: counterBackData.startCount.toString(),
    endCount: counterBackData.endCount.toString(),
  });

  // 유저 입력 요소(여기서는 counter의 title을 입력하는 요소)에 대한 참조를 저장.
  const { inputRef } = useInputFocus();

  // counter를 수정하는 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateEditCounter } = useMutationEditCounter(counterBackData.id);

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  // 유저 입력이 유효하지 않을 때의 유저 피드백.
  const { addInvalidBox } = useBoxValidationContext();

  // counter 수정을 위한 유저 입력들 중, title 업데이트.
  const updateTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserAnswers((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  // counter 수정을 위한 유저 입력들 중, startCount 업데이트.
  const updateStartCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserAnswers((prev) => {
      return { ...prev, startCount: event.target.value };
    });
  };

  // counter 수정을 위한 유저 입력들 중, endCount 업데이트.
  const updateEndCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserAnswers((prev) => {
      return { ...prev, endCount: event.target.value };
    });
  };

  // counter 수정을 위한 비동기 요청 최종 제출하는 함수.
  const submitCounterEdit = () => {
    // 유저 입력들에 대한 유효성 검사 진행.

    // title에 대한 유효성 검사.
    let validationResult = validate([
      required(userAnswers.title),
      below15Letters(userAnswers.title),
    ]);

    if (!validationResult.isValid)
      return addInvalidBox(counterBackData.id, validationResult.messages);

    // startCount에 대한 유효성 검사 1.
    validationResult = validate([
      required(userAnswers.startCount),
      isInteger(userAnswers.startCount),
    ]);
    if (!validationResult.isValid)
      return addInvalidBox(counterBackData.id, validationResult.messages);

    // startCount에 대한 유효성 검사 2.
    validationResult = validate([
      overMin(userAnswers.startCount),
      belowMax(userAnswers.startCount),
    ]);
    if (!validationResult.isValid)
      return addInvalidBox(counterBackData.id, validationResult.messages);

    // endCount에 대한 유효성 검사 1.
    validationResult = validate([
      required(userAnswers.endCount),
      isInteger(userAnswers.endCount),
    ]);
    if (!validationResult.isValid)
      return addInvalidBox(counterBackData.id, validationResult.messages);

    // endCount에 대한 유효성 검사 2.
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

    // counter 수정에 대한 비동기 요청이 호출 되었을 때, 로딩 상태에 대한 유저 피드백.
    activate(counterBackData.id);
    // counter 수정에 대한 비동기 요청이 호출
    mutateEditCounter({
      title: userAnswers.title,
      startCount: Number(userAnswers.startCount),
      endCount: Number(userAnswers.endCount),
    });
    // counter 수정 페이즈 종료.
    closeCounterEditPhase();
  };
  return (
    <>
      <div className="w-full h-24 flex flex-col justify-end items-center gap-1">
        <div>
          <input
            type="text"
            value={userAnswers.title}
            onChange={updateTitle}
            className="text-center text-xs outline-none  caret-gray-400"
            ref={inputRef}
          />
        </div>
        <div className="w-full bg-negative bg-opacity-20 flex justify-center">
          <input
            type="text"
            value={userAnswers.startCount}
            onChange={updateStartCount}
            className="text-center outline-none bg-transparent  caret-gray-400"
          />
        </div>
        <div className="w-full bg-positive bg-opacity-20 flex justify-center">
          <input
            type="text"
            value={userAnswers.endCount}
            onChange={updateEndCount}
            className="text-center outline-none  bg-transparent  caret-gray-400"
          />
        </div>
      </div>
      <div className="absolute bottom-10 left-0 w-full flex justify-center">
        <p className="text-xs font-medium text-gray-300">카운터를 수정합니다</p>
      </div>
      <div className="absolute bottom-1 left-0 w-full flex justify-center">
        <CreationActionButton
          isInLastPhase={true}
          type={creationActionConstants.creationActionType.submit}
          actionHandler={submitCounterEdit}
          classes="w-6 h-6 inline-block"
          hover="p-1"
        />
      </div>
    </>
  );
};

export default CounterEditPhase;
