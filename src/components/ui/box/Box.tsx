import { BoxPropsType } from "./types";

import { boxConstants } from "./constants";

import useFlip from "../flip/hooks/useFlip";
import useBoxGuideContext from "@/contexts/feedback/guide/box-guide/hooks/useBoxGuideContext";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useBoxValidationContext from "@/contexts/feedback/validation/box-validation/hooks/useBoxValidationContext";

import Bucket from "@/components/bucket/Bucket";
import Counter from "@/components/counter/Counter";
import FlipButton from "../flip/FlipButton";
import LoadingFeedbackBox from "../user-feedback/loading/LoadingFeedbackBox";
import ValidationFeedbackBox from "../user-feedback/validation/ValidationFeedbackBox";
import GuideBox from "../user-feedback/guide/GuideBox";

// bucket 또는 counter의 컨테이너 역할을 하는 wrapper 컴포넌트.
const Box = ({
  boxType,
  boxId,
  draggableAttributes,
  droppableAttributes,
  bucketId,
}: BoxPropsType) => {
  // box의 앞면과 뒷면을 구분해주는 커스텀 훅.
  // box를 뒤집는 기능.
  const { isFront, isVisible, flip, showFlipButton, hideFlipButton } =
    useFlip();

  // 현재 비동기 요청을 호출하여 로딩 상태에 있는 box들의 정보를 참조.
  const { activatedBoxIds } = useBoxLoadingContext();

  // 현재 유효성 검사에 실패한 box들의 정보를 참조.
  const { invalidBoxes } = useBoxValidationContext();

  // 현재 가이드가 열려 있는 box들의 정보를 참조.
  const { unreadGuides } = useBoxGuideContext();

  // 이 box가 로딩 중인지를 판단하는 변수.
  const boxIsLoading = activatedBoxIds.includes(boxId);

  // 이 box에서 유효성 검사를 실패 했는지 판단하는 변수.
  let boxIsInvalid = false;
  const idxInInvalidBoxes = invalidBoxes.findIndex((e) => e.id === boxId);
  if (idxInInvalidBoxes !== -1) boxIsInvalid = true;

  // 이 box에 읽지 않은 가이드가 열려 있는지 판단하는 변수.
  let boxIsUnGuided = false;
  const unreadGuideInThisBox = unreadGuides.find((e) => e.boxId === boxId);
  if (unreadGuideInThisBox) boxIsUnGuided = true;

  return (
    <div className="w-full h-40vh flex justify-center items-center">
      <div
        className={`relative w-80 h-40 ${
          // box의 타입이 bucket 혹은 counter인지 판단.
          boxType === boxConstants.boxType.bucket
            ? "border-x-[1px] border-b-[1px] border-gray-300"
            : "border border-gray-300"
        }`}
        id={boxId}
        {...draggableAttributes}
        {...droppableAttributes}
        onMouseOver={showFlipButton}
        onMouseOut={hideFlipButton}
      >
        {
          // 이 box가 로딩 중일 떄의 유저 피드백.
          boxIsLoading && <LoadingFeedbackBox />
        }
        <div className="absolute -bottom-2 translate-y-[100%] left-0 w-80 flex flex-col gap-2 bg-white z-[1]">
          {
            // 이 box의 유효성 검사가 실패 했을 떄의 유저 피드백.
            boxIsInvalid && (
              <ValidationFeedbackBox invalidBoxIdx={idxInInvalidBoxes} />
            )
          }

          {
            // 현재 이 box가 유저에게 보여주어야 하는 가이드를 띄움.
            boxIsUnGuided && (
              <GuideBox
                unreadGuideId={unreadGuideInThisBox!.guideId}
                boxId={boxId}
              />
            )
          }
        </div>
        {!isVisible && (
          <FlipButton flip={flip} classes="sm:invisible visible" />
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
