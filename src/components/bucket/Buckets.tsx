import { boxConstants } from "../ui/box/constants";
import { boxCreatorConstants } from "../ui/creator/constants";

import useQueryBucketIds from "./hooks/http/useQueryBucketIds";
import useChangeBoxPosition from "../ui/box/hooks/useChangeBoxPosition";

import BoxesContainer from "../ui/box/BoxesContainer";
import Box from "../ui/box/Box";
import BoxCreator from "../ui/creator/BoxCreator";

import LoadingFeedbackBoxesContainer from "../ui/user-feedback/loading/LoadingFeedbackBoxesContainer";
import useBoxGuideContext from "@/contexts/feedback/guide/box-guide/hooks/useBoxGuideContext";
import { useEffect } from "react";
import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";

const Buckets = () => {
  const { bucketIds, isLoading, isFetching } = useQueryBucketIds();

  const { draggableAttributes, droppableAttributes, isPending } =
    useChangeBoxPosition(boxConstants.boxType.bucket, bucketIds);

  const { resetUnreadGuide } = useBoxGuideContext();
  const { updateBoxCreatorGuide, updateModalGuide } = useNotBoxGuideContext();

  useEffect(() => {
    resetUnreadGuide();
    updateBoxCreatorGuide(false, "");
    updateModalGuide(false, "");
  }, [resetUnreadGuide, updateBoxCreatorGuide, updateModalGuide]);

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
