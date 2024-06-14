import { MotivationTextsQueryPhasePropsType } from "./types";

import useQueryMotivationTextIds from "./hooks/http/useQueryMotivationTextIds";

import MotivationTexts from "./MotivationTexts";
import LoadingFeedbackBox from "@/components/ui/user-feedback/loading/LoadingFeedbackBox";

// box에 속한 모든 motivatioTextk들의 id를 서버로부터 가져오는 역할을 하는 컴포넌트.
const MotivationTextsQueryPhase = ({
  boxData,
  backToNotSelected,
}: MotivationTextsQueryPhasePropsType) => {
  // box에 속한 모든 motivaitonText들의 id를 불러오는 비동기 요청을 호출하는 커스텀 훅.
  const { motivationTextIds, isLoading, isFetching } =
    useQueryMotivationTextIds(boxData.boxId, boxData.boxType);

  // box에 속한 모든 motivaitonText들의 id를 불러오는 비동기 요청이 로딩 상태일 때, 유저 피드백.
  if (isLoading) return <LoadingFeedbackBox />;

  return (
    <>
      {isFetching && <LoadingFeedbackBox />}
      {
        <MotivationTexts
          boxData={boxData}
          backToNotSelected={backToNotSelected}
          motivationTextIds={motivationTextIds!}
        />
      }
    </>
  );
};

export default MotivationTextsQueryPhase;
