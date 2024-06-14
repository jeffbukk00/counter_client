import { useEffect } from "react";

import { boxConstants } from "../ui/box/constants";
import { boxCreatorConstants } from "../ui/creator/constants";

import useQueryCounterIds from "./hooks/http/useQueryCounterIds";
import useChangeBoxPosition from "../ui/box/hooks/useChangeBoxPosition";
import useBoxGuideContext from "@/contexts/feedback/guide/box-guide/hooks/useBoxGuideContext";
import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";

import BoxesContainer from "../ui/box/BoxesContainer";
import Box from "../ui/box/Box";
import BoxCreator from "../ui/creator/BoxCreator";
import LoadingFeedbackBoxesContainer from "../ui/user-feedback/loading/LoadingFeedbackBoxesContainer";

// "/main/:id/counters" 경로의 최상위 컴포넌트.
// bucket에 속한 모든 counter들의 id를 가져옴.
const Counters = ({ bucketId }: { bucketId: string }) => {
  // bucket에 속한 모든 counter들의 id를 가져오는 비동기 요청 호출하는 커스텀 훅.
  const { counterIds, isLoading, isFetching } = useQueryCounterIds(bucketId);

  // counter의 위치(bucket이 참조 하는 모든 counter들의 id를 담고 있는 배열에서의 인덱스 또는 화면 상에서 보여지는 위치)를 업데이트하기 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { draggableAttributes, droppableAttributes, isPending } =
    useChangeBoxPosition(boxConstants.boxType.counter, counterIds, bucketId);

  // box에 바인딩 되어 표시되는 가이드 사용을 위한 커스텀 훅.
  // 여기서는 표시된 가이드들을 리셋하기 위한 함수를 반환.
  const { resetUnreadGuide } = useBoxGuideContext();

  // box가 아닌 메인 요소(box-creator, modal)의 가이드 사용을 위한 커스텀 훅.
  const { updateBoxCreatorGuide, updateModalGuide } = useNotBoxGuideContext();

  useEffect(() => {
    // 페이지 전환 시, box에 대한 가이드들 리셋.
    resetUnreadGuide();
    // 페이지 전환 시, box-creator에 대한 가이드들 리셋.
    updateBoxCreatorGuide(false, "");
    // 페이지 전환 시, modal에 대한 가이드들 리셋.
    updateModalGuide(false, "");
  }, [resetUnreadGuide, updateBoxCreatorGuide, updateModalGuide]);

  // bucket에 속한 모든 counter들의 id를 가져오는 비동기 요청이 로딩 중일 때, 유저 피드백.
  if (isLoading) return <LoadingFeedbackBoxesContainer />;

  return (
    <BoxesContainer
      isFetching={isFetching || isPending}
      isOneLine={counterIds && counterIds.length <= 2}
    >
      {counterIds?.map((e) => (
        <Box
          key={e}
          boxType={boxConstants.boxType.counter}
          boxId={e}
          draggableAttributes={draggableAttributes}
          droppableAttributes={droppableAttributes}
          bucketId={bucketId}
        />
      ))}
      <BoxCreator
        boxCreatorType={boxCreatorConstants.boxCreatorType.counterCreator}
        bucketId={bucketId}
      />
    </BoxesContainer>
  );
};

export default Counters;
