import { BoxCreatorPropsType } from "./types";
import { boxCreatorConstants } from "./constants";

import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";
import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";

import CounterCreator from "@/components/counter-creator/CounterCreator";
import BucketCreator from "@/components/bucket-creator/BucketCreator";
import LoadingFeedbackBox from "../user-feedback/loading/LoadingFeedbackBox";
import ValidationFeedbackBoxCreator from "../user-feedback/validation/ValidationFeedbackBoxCreator";
import GuideBoxCreator from "../user-feedback/guide/GuideBoxCreator";

// box(bucket 또는 counter)를 생성하는 컴포넌트의 컨테이너 역할을 함.
// wrapper.
const BoxCreator = ({ boxCreatorType, bucketId }: BoxCreatorPropsType) => {
  // box-creator에서 호출한 비동기 요청이 로딩 상태인지 확인.
  const { boxCreatorIsLoading } = useNotBoxLoadingContext();
  // box-creator에서의 유저 입력이 유효하지 않은지 확인.
  const { isBoxCreatorInvalid } = useNotBoxValidationContext();
  // box-creator에서 현재 유저 가이드를 띄울 것이 있는지 확인.
  const { boxCreatorGuide } = useNotBoxGuideContext();

  return (
    <div className="w-full h-40vh flex justify-center items-center">
      <div className="w-80 h-40 border relative">
        {boxCreatorIsLoading && <LoadingFeedbackBox />}
        <div className="absolute -bottom-2 translate-y-[100%] left-0 w-80 flex flex-col gap-2  bg-white z-[1]">
          {isBoxCreatorInvalid.isInvalid && <ValidationFeedbackBoxCreator />}
          {boxCreatorGuide.isUnguided && (
            <GuideBoxCreator unreadGuideId={boxCreatorGuide.guideId} />
          )}
        </div>

        {boxCreatorType ===
          boxCreatorConstants.boxCreatorType.bucketCreator && <BucketCreator />}
        {boxCreatorType ===
          boxCreatorConstants.boxCreatorType.counterCreator && (
          <CounterCreator bucketId={bucketId!} />
        )}
      </div>
    </div>
  );
};

export default BoxCreator;
