import { BoxPropsType } from "./types";

import { boxConstants } from "./constants";

import useFlip from "../flip/hooks/useFlip";

import Bucket from "@/components/bucket/Bucket";
import Counter from "@/components/counter/Counter";
import FlipButton from "../flip/FlipButton";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import LoadingFeedbackBox from "../user-feedback/loading/LoadingFeedbackBox";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";
import ValidationFeedbackBox from "../user-feedback/validation/ValidationFeedbackBox";
import useBoxGuideContext from "@/contexts/feedback/guide/box-guide/hooks/useBoxGuideContext";
import GuideBox from "../user-feedback/guide/GuideBox";

const Box = ({
  boxType,
  boxId,
  draggableAttributes,
  droppableAttributes,
  bucketId,
}: BoxPropsType) => {
  const { isFront, isVisible, flip, showFlipButton, hideFlipButton } =
    useFlip();
  const { activatedBoxIds } = useBoxLoadingContext();
  const { invalidBoxes } = useBoxValidationContext();
  const { unreadGuides } = useBoxGuideContext();

  const boxIsLoading = activatedBoxIds.includes(boxId);

  let boxIsInvalid = false;
  const idxInInvalidBoxes = invalidBoxes.findIndex((e) => e.id === boxId);
  if (idxInInvalidBoxes !== -1) boxIsInvalid = true;

  let boxIsUnGuided = false;
  const unreadGuideInThisBox = unreadGuides.find((e) => e.boxId === boxId);
  if (unreadGuideInThisBox) boxIsUnGuided = true;

  return (
    <div className="w-full h-40vh flex justify-center items-center">
      <div
        className="w-80 h-40 border relative"
        {...draggableAttributes}
        {...droppableAttributes}
        onMouseOver={showFlipButton}
        onMouseOut={hideFlipButton}
      >
        {boxIsLoading && <LoadingFeedbackBox />}
        {boxIsInvalid && (
          <ValidationFeedbackBox invalidBoxIdx={idxInInvalidBoxes} />
        )}
        {boxIsUnGuided && (
          <GuideBox unreadGuideId={unreadGuideInThisBox!.guideId} />
        )}
        {isVisible && <FlipButton flip={flip} />}
        {boxType === boxConstants.boxType.bucket && (
          <Bucket bucketId={boxId} isFront={isFront} isVisible={isVisible} />
        )}
        {boxType === boxConstants.boxType.counter && (
          <Counter counterId={boxId} bucketId={bucketId!} isFront={isFront} />
        )}
      </div>
    </div>
  );
};

export default Box;
