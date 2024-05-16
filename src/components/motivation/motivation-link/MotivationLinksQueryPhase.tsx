import { MotivationLinksQueryPhasePropsType } from "./types";

import useQueryMotivationLinkIds from "./hooks/http/useQueryMotivationLinkIds";

import MotivationLinks from "./MotivationLinks";
import LoadingFeedbackBox from "@/components/ui/user-feedback/loading/LoadingFeedbackBox";

const MotivationLinksQueryPhase = ({
  boxData,
  backToNotSelected,
}: MotivationLinksQueryPhasePropsType) => {
  const { motivationLinkIds, isLoading, isFetching } =
    useQueryMotivationLinkIds(boxData.boxId, boxData.boxType);

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
