import { useState, useEffect, ChangeEventHandler, useRef } from "react";

import { CounterCreationQueryPropsType } from "./types";
import { counterCreationConstants } from "./constants";
import { creationActionConstants } from "../ui/creation-action/constants";
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

import CreationActionButton from "../ui/creation-action/CreationActionButton";

// currentPhase 상태가 무엇인지에 따라, 역할이 변화함.
// (currentPhase 상태에 따라,)
// counter 생성을 위한 유저 입력을 받는 컴포넌트.
// counter 생성을 최종적으로 제출하는 컴포넌트.
const CounterCreationQuery = ({
  currentPhase,
  isInLastPhase,
  userAnswers,
  updateUserAnswers,
  submitCounterCreation,
}: CounterCreationQueryPropsType) => {
  // counter 생성을 위한 페이즈들 중, 현재 페이즈에서의 유저 입력만 관리하는 상태.
  const [userAnswerInCurrentPhase, setUserAnswerInCurrentPhase] = useState("");

  // 유저 입력이 시작 되었는지 나타내는 상태. UX 개선용.
  const [typeIsStarted, setTypeIsStarted] = useState(false);

  // 유저 입력 요소에 대한 참조를 저장.
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 유저 입력이 유효하지 않을 경우, 피드백을 위한 커스텀 훅.
  const { updateIsBoxCreatorInvalid } = useNotBoxValidationContext();

  // 현재 페이즈에서의 유저 입력을 관리하는 상태를 업데이트 하기 위한 함수.
  const changeUserAnswerInCurrentPhase: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUserAnswerInCurrentPhase(event.target.value);
  };

  useEffect(() => {
    // 유저가 어떤 페이즈에서 입력을 마친 후, 다른 페이즈로 이동했다가 다시 돌아 왔을 때, 그 페이즈에 이미 입력 된 이력이 있다면 그것을 자동으로 불러옴.
    if (currentPhase === 0 && userAnswers.title.length > 0) {
      setUserAnswerInCurrentPhase(userAnswers.title);
      // 입력 시작으로 자동으로 간주.
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
      // 유저 입력 시작 전, 유저 입력을 위한 요소를 자동으로 포커스.
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
              actionHandler={
                // counter 생성 최종적으로 제출.
                submitCounterCreation
              }
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
                // 유저 입력의 길이가 0보다 큰 경우, 유저 입력이 시작했다고 판단.
                if (event.target.value.length <= 0) {
                  setTypeIsStarted(false);
                } else {
                  setTypeIsStarted(true);
                }

                // 유저 입력이 변할 때마다 업데이트.
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
                // 다음 페이즈로 넘어가기 전, 유효성 검사 진행.
                // 현재 속한 페이즈가 무엇인기에 따라 진행 되는 유효성 검사가 다름.

                if (currentPhase === 0) {
                  // counter의 title에 대한 유효성 검사.
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
                  // counter의 startCount에 대한 유효성 검사 1.
                  let validationResult = validate([
                    required(userAnswerInCurrentPhase),
                    isInteger(userAnswerInCurrentPhase),
                  ]);
                  if (!validationResult.isValid)
                    return updateIsBoxCreatorInvalid(
                      true,
                      validationResult.messages
                    );

                  // counter의 startCount에 대한 유효성 검사 2.
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
                  // counter의 endCount에 대한 유효성 검사 1.
                  let validationResult = validate([
                    required(userAnswerInCurrentPhase),
                    isInteger(userAnswerInCurrentPhase),
                  ]);
                  if (!validationResult.isValid)
                    return updateIsBoxCreatorInvalid(
                      true,
                      validationResult.messages
                    );

                  // counter의 endCount에 대한 유효성 검사 2.
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

                // 다음 페이즈로 넘어 가기 전, counter 생성을 위한 모든 페이즈들의 유저 입력을 관리하는 상태에 현재 페이즈의 유저 입력을 업데이트.
                updateUserAnswers(userAnswerInCurrentPhase);
                // 다음 페이즈로 넘어 가기 전, 초기화 1.
                setTypeIsStarted(false);
                // 다음 페이즈로 넘어 가기 전, 초기화 2.
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
