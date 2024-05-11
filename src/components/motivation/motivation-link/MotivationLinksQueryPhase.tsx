import { MotivationLinksQueryPhasePropsType } from "./types";

import useQueryMotivationLinkIds from "./hooks/http/useQueryMotivationLinkIds";

import MotivationLinks from "./MotivationLinks";

const MotivationLinksQueryPhase = ({
  boxData,
  backToNotSelected,
}: MotivationLinksQueryPhasePropsType) => {
  const { motivationLinkIds, isLoading } = useQueryMotivationLinkIds(
    boxData.boxId,
    boxData.boxType
  );

  if (isLoading) return <p>모티베이션 링크 아이디들을 요청 중입니다...</p>;

  return (
    <MotivationLinks
      boxData={boxData}
      backToNotSelected={backToNotSelected}
      motivationLinkIds={motivationLinkIds!}
    />
  );
};

export default MotivationLinksQueryPhase;
