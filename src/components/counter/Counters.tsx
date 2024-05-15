import { boxConstants } from "../ui/box/constants";
import { boxCreatorConstants } from "../ui/creator/constants";

import useQueryCounterIds from "./hooks/http/useQueryCounterIds";
import useChangeBoxPosition from "../ui/box/hooks/useChangeBoxPosition";

import BoxesContainer from "../ui/box/BoxesContainer";
import Box from "../ui/box/Box";
import BoxCreator from "../ui/creator/BoxCreator";

const Counters = ({ bucketId }: { bucketId: string }) => {
  const { counterIds, isLoading } = useQueryCounterIds(bucketId);

  const { draggableAttributes, droppableAttributes } = useChangeBoxPosition(
    boxConstants.boxType.counter,
    counterIds,
    bucketId
  );

  return (
    <BoxesContainer isLoading={isLoading}>
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
