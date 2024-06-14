import { useState } from "react";

import { CounterCreationPhasePropsType, UserAnswersStateType } from "./types";
import { counterCreationConstants } from "./constants";
import { guideConstants } from "../ui/user-feedback/guide/constants";

import useMutationCreateCounter from "./hooks/http/useMutationCreateCounter";
import useNavigator from "../ui/navigator/hooks/useNavigator";
import useBoxCreatorGuide from "../ui/user-feedback/guide/hooks/useBoxCreatorGuide";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

import FinishCreationButton from "../ui/creator/FinishCreationButton";
import GotoPrevPhaseButton from "../ui/navigator/GotoPrevPhaseButton";
import CounterCreationAnswerList from "./CounterCreationAnswerList";
import CounterCreationQuery from "./CounterCreationQuery";

// counter 생성을 진행 중인 페이즈의 최상위 컴포넌트.
const CounterCreationPhase = ({
  finishCreation,
  bucketId,
}: CounterCreationPhasePropsType) => {
  // counter 생성을 위한 모든 유저 입력들을 관리 하는 상태.
  const [userAnswers, setUserAnswers] = useState<UserAnswersStateType>({
    title: "",
    startCount: "",
    endCount: "",
  });

  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useBoxCreatorGuide(guideConstants.guideIds["guideId5"]);

  // counter 생성을 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateCreateCounter } = useMutationCreateCounter(bucketId);

  // box가 아닌 메인 요소(box-creator, modal)의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box-creator가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activateBoxCreator } = useNotBoxLoadingContext();

  // 네비게이터 역할을 하는 상태를 관리하는 커스텀 훅.
  // 네비게이터란 연결 된 컴포넌트 간 번호를 부여하여, 버튼 클릭에 따라 앞뒤 컴포넌트로 이동할 수 있게 만드는 기능.
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

  // counter 생성을 위한 모든 유저 입력들을 모아두는 상태를 업데이트 하는 함수.
  const updateUserAnswers = (userAnswerInCurrentPhase: string) => {
    if (currentPhase === 0) {
      // currentPhase의 번호가 0일 때, counter 생성을 위한 유저 입력들 중 title을 업데이트.
      setUserAnswers((prev) => {
        return { ...prev, title: userAnswerInCurrentPhase };
      });
    }

    if (currentPhase === 1) {
      // currentPhase의 번호가 1일 때, counter 생성을 위한 유저 입력들 중 startCount를 업데이트.
      setUserAnswers((prev) => {
        return { ...prev, startCount: userAnswerInCurrentPhase };
      });
    }

    if (currentPhase === 2) {
      // currentPhase의 번호가 2일 때, counter 생성을 위한 유저 입력들 중 endCount를 업데이트.
      setUserAnswers((prev) => {
        return { ...prev, endCount: userAnswerInCurrentPhase };
      });
    }

    // 다음 phase로 이동.
    gotoNextPhase();
  };

  // counter 생성을 위해 최종적으로 호출 하는 함수.
  const submitCounterCreation = () => {
    // counter 생성을 위한 비동기 요청이 호출 될 때, 로딩 상태에 대한 유저 피드백.
    activateBoxCreator();

    // counter 생성을 위한 비동기 요청.
    mutateCreateCounter({
      title: userAnswers.title,
      startCount: Number(userAnswers.startCount),
      endCount: Number(userAnswers.endCount),
    });

    // counter 생성 종료.
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
