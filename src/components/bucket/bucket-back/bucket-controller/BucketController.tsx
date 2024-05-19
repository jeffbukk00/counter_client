import { BucketControllerPropsType } from "./types";

import BucketEditControl from "./BucketEditControl";
import BucketDuplicateControl from "./BucketDuplicateControl";
import BucketMergeControl from "./BucketMergeControl";
import BucketRemoveControl from "./BucketRemoveControl";

const BucketController = ({
  openBucketEditPhase,
  bucketBackData,
}: BucketControllerPropsType) => {
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
