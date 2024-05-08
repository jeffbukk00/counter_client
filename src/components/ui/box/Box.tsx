import { BoxPropsType } from "./types";

import { boxConstants } from "./constants";

import Bucket from "@/components/bucket/Bucket";
import Counter from "@/components/counter/Counter";

const Box = ({
  boxType,
  boxId,
  draggableAttributes,
  droppableAttributes,
  bucketId,
}: BoxPropsType) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className="w-80 h-40 border"
        id={boxId}
        {...draggableAttributes}
        {...droppableAttributes}
      >
        {boxType === boxConstants.boxType.bucket && <Bucket bucketId={boxId} />}
        {boxType === boxConstants.boxType.counter && (
          <Counter counterId={boxId} bucketId={bucketId} />
        )}
      </div>
    </div>
  );
};

export default Box;
