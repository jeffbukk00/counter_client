import { useEffect } from "react";

import { boxConstants } from "../ui/box/constants";
import { boxCreatorConstants } from "../ui/creator/constants";

import useQueryBucketIds from "./hooks/http/useQueryBucketIds";
import useChangeBoxPosition from "../ui/box/hooks/useChangeBoxPosition";
import useBoxGuideContext from "@/contexts/feedback/guide/box-guide/hooks/useBoxGuideContext";
import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";

import BoxesContainer from "../ui/box/BoxesContainer";
import Box from "../ui/box/Box";
import BoxCreator from "../ui/creator/BoxCreator";
import LoadingFeedbackBoxesContainer from "../ui/user-feedback/loading/LoadingFeedbackBoxesContainer";

// /main/buckets 경로의 최상위 컴포넌트.
// 모든 bucket들의 데이터를 불러옴.
const Buckets = () => {
  // 모든 bucket들의 id를 불러오는 비동기 요청을 보내고 그 상태를 관리하는 커스텀 훅.
  const { bucketIds, isLoading, isFetching } = useQueryBucketIds();

  // bucket들의 위치(bucket들의 id를 담고 있는 배열의 인덱스이자, 화면 상 표시되는 위치)를 변경하고, 그를 위한 비동기 요청을 보내는 커스텀 훅.
  const { draggableAttributes, droppableAttributes, isPending } =
    useChangeBoxPosition(boxConstants.boxType.bucket, bucketIds);

  // box의 유저 가이드를 관리하는 커스텀 훅. 여기서는 box에 대해 현재 활성화 중인 가이드들을 전부 리셋하는 함수를 사용.
  const { resetUnreadGuide } = useBoxGuideContext();

  // box가 아닌 메인 요소들의 유저 가이드를 관리하는 커스텀 훅.
  // box가 아닌 메인 요소는 box-creator와 modal이 있음.
  const { updateBoxCreatorGuide, updateModalGuide } = useNotBoxGuideContext();

  useEffect(() => {
    // 페이지 전환 시 box에 대한 가이드들을 리셋.
    resetUnreadGuide();
    // 페이지 전환 시, box-creator에 대한 가이드들을 리셋.
    updateBoxCreatorGuide(false, "");
    // 페이지 전환 시, modal에 대한 가이드들을 리셋.
    updateModalGuide(false, "");
  }, [resetUnreadGuide, updateBoxCreatorGuide, updateModalGuide]);

  // 모든 bucket들의 id를 불러오는 비동기 요청이 로딩 상태일 때, 유저 피드백.
  if (isLoading) return <LoadingFeedbackBoxesContainer />;

  return (
    <BoxesContainer
      isFetching={isFetching || isPending}
      isOneLine={bucketIds && bucketIds.length <= 2}
    >
      {bucketIds?.map((e) => (
        <Box
          key={e}
          boxType={boxConstants.boxType.bucket}
          boxId={e}
          draggableAttributes={draggableAttributes}
          droppableAttributes={droppableAttributes}
        />
      ))}
      <BoxCreator
        boxCreatorType={boxCreatorConstants.boxCreatorType.bucketCreator}
      />
    </BoxesContainer>
  );
};

export default Buckets;
