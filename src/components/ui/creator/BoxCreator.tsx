import { BoxCreatorPropsType } from "./types";
import { boxCreatorConstants } from "./constants";

import BucketCreator from "@/components/bucket-creator/BucketCreator";
import CounterCreator from "@/components/counter-creator/CounterCreator";

import LoadingFeedbackBox from "../user-feedback/loading/LoadingFeedbackBox";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useNotBoxValidationContext from "@/contexts/feedback/validation/not-box-validation/hooks/useNotBoxValidationContext";

import ValidationFeedbackBoxCreator from "../user-feedback/validation/ValidationFeedbackBoxCreator";
import useNotBoxGuideContext from "@/contexts/feedback/guide/not-box-guide/hooks/useNotBoxGuideContext";
import GuideBoxCreator from "../user-feedback/guide/GuideBoxCreator";

const BoxCreator = ({ boxCreatorType, bucketId }: BoxCreatorPropsType) => {
  const { boxCreatorIsLoading } = useNotBoxLoadingContext();
  const { isBoxCreatorInvalid } = useNotBoxValidationContext();
  const { boxCreatorGuide } = useNotBoxGuideContext();

  return (
    <div className="w-full h-40vh flex justify-center items-center">
      <div className="w-80 h-40 border relative">
        {boxCreatorIsLoading && <LoadingFeedbackBox />}
        {isBoxCreatorInvalid.isInvalid && <ValidationFeedbackBoxCreator />}
        {boxCreatorGuide.isUnguided && (
          <GuideBoxCreator unreadGuideId={boxCreatorGuide.guideId} />
        )}
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
