import { MotivationLinksQueryPhasePropsType } from "./types";

import useQueryMotivationLinkIds from "./hooks/http/useQueryMotivationLinkIds";

import MotivationLinks from "./MotivationLinks";
import LoadingFeedbackBox from "@/components/ui/user-feedback/loading/LoadingFeedbackBox";

// box에 속한 모든 motivationLink들의 id를 서버로부터 가져오는 역할을 하는 컴포넌트.
const MotivationLinksQueryPhase = ({
  boxData,
  backToNotSelected,
}: MotivationLinksQueryPhasePropsType) => {
  // box에 속한 모든 motivaitonLink들의 id를 불러오는 비동기 요청을 호출하는 커스텀 훅.
  const { motivationLinkIds, isLoading, isFetching } =
    useQueryMotivationLinkIds(boxData.boxId, boxData.boxType);

  // box에 속한 모든 motivaitonLink들의 id를 불러오는 비동기 요청이 로딩 상태일 때, 유저 피드백.
  if (isLoading) return <LoadingFeedbackBox />;

  return (
    <>
      {isFetching && <LoadingFeedbackBox />}
      <MotivationLinks
        boxData={boxData}
        backToNotSelected={backToNotSelected}
        motivationLinkIds={motivationLinkIds!}
      />
    </>
  );
};

export default MotivationLinksQueryPhase;
