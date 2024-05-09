import { boxConstants } from "../ui/box/constants";
import { boxCreatorConstants } from "../ui/box-creator/constants";

import useQueryCounterIds from "./hooks/http/useQueryCounterIds";
import useChangeBoxPosition from "../ui/box/hooks/useChangeBoxPosition";

import BoxesContainer from "../ui/box/BoxesContainer";
import Box from "../ui/box/Box";
import BoxCreator from "../ui/box-creator/BoxCreator";

const Counters = ({ bucketId }: { bucketId: string }) => {
  const { counterIds, isLoading } = useQueryCounterIds(bucketId);

  const { orderedIds, draggableAttributes, droppableAttributes } =
    useChangeBoxPosition(boxConstants.boxType.counter, counterIds, bucketId);

  if (isLoading) return <p>카운터 아이디들을 요청 중입니다...</p>;

  return (
    <BoxesContainer>
      {orderedIds?.map((e) => (
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
