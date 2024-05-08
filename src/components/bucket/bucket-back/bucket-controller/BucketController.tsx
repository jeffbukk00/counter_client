import { BucketControllerpPropsType } from "../types";

import BucketEditControl from "./BucketEditControl";
import BucketDuplicateControl from "./BucketDuplicateControl";

const BucketController = ({
  openBucketEditPhase,
  bucketBackData,
}: BucketControllerpPropsType) => {
  return (
    <>
      <BucketEditControl openBucketEditPhase={openBucketEditPhase} />
      <BucketDuplicateControl bucketId={bucketBackData.id} />
    </>
  );
};

export default BucketController;
