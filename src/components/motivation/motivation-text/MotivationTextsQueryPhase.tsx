import { MotivationTextsQueryPhasePropsType } from "./types";

import useQueryMotivationTextIds from "./hooks/http/useQueryMotivationTextIds";

import MotivationTexts from "./MotivationTexts";
import LoadingFeedbackBox from "@/components/ui/user-feedback/loading/LoadingFeedbackBox";

const MotivationTextsQueryPhase = ({
  boxData,
  backToNotSelected,
}: MotivationTextsQueryPhasePropsType) => {
  const { motivationTextIds, isLoading, isFetching } =
    useQueryMotivationTextIds(boxData.boxId, boxData.boxType);

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
