import { BoxPropsType } from "./types";

import { boxConstants } from "./constants";

import useFlip from "../flip/hooks/useFlip";

import Bucket from "@/components/bucket/Bucket";
import Counter from "@/components/counter/Counter";
import FlipButton from "../flip/FlipButton";

const Box = ({
  boxType,
  boxId,
  draggableAttributes,
  droppableAttributes,
  bucketId,
}: BoxPropsType) => {
  const { isFront, isVisible, flip, showFlipButton, hideFlipButton } =
    useFlip();

  return (
    <div className="w-full h-40vh flex justify-center items-center">
      <div
        className="w-80 h-40 border"
        id={boxId}
        {...draggableAttributes}
        {...droppableAttributes}
        onMouseOver={showFlipButton}
        onMouseOut={hideFlipButton}
      >
        {isVisible && <FlipButton flip={flip} />}
        {boxType === boxConstants.boxType.bucket && (
          <Bucket bucketId={boxId} isFront={isFront} />
        )}
        {boxType === boxConstants.boxType.counter && (
          <Counter counterId={boxId} bucketId={bucketId} isFront={isFront} />
        )}
      </div>
    </div>
  );
};

export default Box;
