import { BucketControllerPropsType } from "./types";

import BucketEditControl from "./BucketEditControl";
import BucketDuplicateControl from "./BucketDuplicateControl";
import BucketMergeControl from "./BucketMergeControl";

const BucketController = ({
  openBucketEditPhase,
  bucketBackData,
}: BucketControllerPropsType) => {
  return (
    <>
      <BucketEditControl openBucketEditPhase={openBucketEditPhase} />
      <BucketDuplicateControl bucketId={bucketBackData.id} />
      <BucketMergeControl bucketBackData={bucketBackData} />
    </>
  );
};

export default BucketController;
