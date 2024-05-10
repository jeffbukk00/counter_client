import { boxConstants } from "../ui/box/constants";
import { boxCreatorConstants } from "../ui/box-creator/constants";

import useQueryBucketIds from "./hooks/http/useQueryBucketIds";
import useChangeBoxPosition from "../ui/box/hooks/useChangeBoxPosition";

import BoxesContainer from "../ui/box/BoxesContainer";
import Box from "../ui/box/Box";
import BoxCreator from "../ui/box-creator/BoxCreator";

const Buckets = () => {
  const { bucketIds, isLoading } = useQueryBucketIds();

  const { draggableAttributes, droppableAttributes } = useChangeBoxPosition(
    boxConstants.boxType.bucket,
    bucketIds
  );

  if (isLoading) return <p>버킷 아이디들을 요청 중입니다</p>;

  return (
    <BoxesContainer>
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
