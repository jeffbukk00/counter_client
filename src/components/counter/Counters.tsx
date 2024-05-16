import { boxConstants } from "../ui/box/constants";
import { boxCreatorConstants } from "../ui/creator/constants";

import useQueryCounterIds from "./hooks/http/useQueryCounterIds";
import useChangeBoxPosition from "../ui/box/hooks/useChangeBoxPosition";

import BoxesContainer from "../ui/box/BoxesContainer";
import Box from "../ui/box/Box";
import BoxCreator from "../ui/creator/BoxCreator";
import LoadingFeedbackBoxesContainer from "../ui/user-feedback/loading/LoadingFeedbackBoxesContainer";
import useBoxGuideContext from "@/contexts/feedback/guide/box-guide/hooks/useBoxGuideContext";
import { useEffect } from "react";

const Counters = ({ bucketId }: { bucketId: string }) => {
  const { counterIds, isLoading, isFetching } = useQueryCounterIds(bucketId);

  const { draggableAttributes, droppableAttributes, isPending } =
    useChangeBoxPosition(boxConstants.boxType.counter, counterIds, bucketId);

  const { resetUnreadGuide } = useBoxGuideContext();

  useEffect(() => {
    resetUnreadGuide();
  }, [resetUnreadGuide]);

  if (isLoading) return <LoadingFeedbackBoxesContainer />;

  return (
    <BoxesContainer isFetching={isFetching || isPending}>
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
