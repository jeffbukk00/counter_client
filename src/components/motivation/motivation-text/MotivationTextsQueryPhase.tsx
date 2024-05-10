import { MotivationTextsQueryPhasePropsType } from "./types";

import useQueryMotivationTextIds from "./hooks/http/useQueryMotivationTextIds";

import MotivationTexts from "./MotivationTexts";

const MotivationTextsQueryPhase = ({
  boxData,
  backToNotSelected,
}: MotivationTextsQueryPhasePropsType) => {
  const { motivationTextIds, isLoading } = useQueryMotivationTextIds(
    boxData.boxId,
    boxData.boxType
  );

  if (isLoading) return <p>모티베이션 텍스트 아이디들을 요청 중입니다...</p>;

  return (
    <MotivationTexts
      boxData={boxData}
      backToNotSelected={backToNotSelected}
      motivationTextIds={motivationTextIds!}
    />
  );
};

export default MotivationTextsQueryPhase;
