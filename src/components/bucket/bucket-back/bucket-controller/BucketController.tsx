import { BucketControllerPropsType } from "./types";

import BucketEditControl from "./BucketEditControl";
import BucketDuplicateControl from "./BucketDuplicateControl";
import BucketMergeControl from "./BucketMergeControl";
import BucketRemoveControl from "./BucketRemoveControl";
import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

const BucketController = ({
  openBucketEditPhase,
  bucketBackData,
}: BucketControllerPropsType) => {
  useBoxGuide(guideConstants.guideIds["guideId3"], bucketBackData.id);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-center gap-2">
        <BucketEditControl openBucketEditPhase={openBucketEditPhase} />
        <BucketDuplicateControl bucketId={bucketBackData.id} />
        <BucketMergeControl bucketBackData={bucketBackData} />
        <BucketRemoveControl bucketId={bucketBackData.id} />
      </div>
    </div>
  );
};

export default BucketController;
