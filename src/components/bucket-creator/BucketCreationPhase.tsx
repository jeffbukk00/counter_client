import { useState } from "react";

import { BucketCreationPhasePropsType, UserAnswersStateType } from "./types";
import { bucketCreationConstants } from "./constants";

import useMutationCreateBuckets from "./hooks/http/useMutationCreateBucket";
import useNavigator from "../ui/navigator/hooks/useNavigator";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

import FinishCreationButton from "../ui/creator/FinishCreationButton";
import GotoPrevPhaseButton from "../ui/navigator/GotoPrevPhaseButton";
import BucketCreationAnswerList from "./BucketCreationAnswerList";
import BucketCreationQuery from "./BucketCreationQuery";

// bucket 생성이 시작 된 이후의 페이즈를 나타내는 컴포넌트.
const BucketCreationPhase = ({
  finishCreation,
}: BucketCreationPhasePropsType) => {
  // bucket 생성을 위한 모든 유저 입력들을 관리하는 상태.
  const [userAnswers, setUserAnswers] = useState<UserAnswersStateType>({
    title: "",
  });

  // bucket 생성을 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateCreateBucket } = useMutationCreateBuckets();

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
    bucketCreationConstants.bucketCreationPhase.first,
    bucketCreationConstants.bucketCreationPhase.last
  );

  // 유저 입력에 대한 상태를 업데이트 하는 함수.
  const updateUserAnswers = (userAnswerInCurrentPhase: string) => {
    setUserAnswers((prev) => {
      return { ...prev, title: userAnswerInCurrentPhase };
    });
    // 상태 업데이트 이후, 다음 페이즈로.
    gotoNextPhase();
  };

  // bucket 생성을 최종적으로 제출하는 함수.
  const submitBucketCreation = () => {
    // bucket 생성 비동기 요청 호출 후, 로딩 상태에 대한 유저 피드백을 위해 호출.
    activateBoxCreator();
    // bucket 생성 비동기 요청.
    mutateCreateBucket(userAnswers);
    // bucket 생성 종료.
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
            classes="w-7 h-7 inline-block "
            gotoPrevPhase={gotoPrevPhase}
          />
        </span>
      )}
      <BucketCreationAnswerList
        currentPhase={currentPhase}
        isInLastPhase={isInLastPhase}
        userAnswers={userAnswers}
      />
      <BucketCreationQuery
        currentPhase={currentPhase}
        isInLastPhase={isInLastPhase}
        userAnswers={userAnswers}
        updateUserAnswers={updateUserAnswers}
        submitBucketCreation={submitBucketCreation}
      />
    </>
  );
};

export default BucketCreationPhase;
