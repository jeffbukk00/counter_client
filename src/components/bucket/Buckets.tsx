import { boxConstants } from "../ui/box/constants";
import { boxCreatorConstants } from "../ui/creator/constants";

import useQueryBucketIds from "./hooks/http/useQueryBucketIds";
import useChangeBoxPosition from "../ui/box/hooks/useChangeBoxPosition";

import BoxesContainer from "../ui/box/BoxesContainer";
import Box from "../ui/box/Box";
import BoxCreator from "../ui/creator/BoxCreator";

import LoadingFeedbackBoxesContainer from "../ui/user-feedback/loading/LoadingFeedbackBoxesContainer";

const Buckets = () => {
  const { bucketIds, isLoading, isFetching } = useQueryBucketIds();

  const { draggableAttributes, droppableAttributes } = useChangeBoxPosition(
    boxConstants.boxType.bucket,
    bucketIds
  );

  if (isLoading) return <LoadingFeedbackBoxesContainer />;

  return (
    <BoxesContainer isFetching={isFetching}>
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
