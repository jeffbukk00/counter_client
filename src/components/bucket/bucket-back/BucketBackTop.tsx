import { BucketBackTopPropsType } from "./types";
import { bucketBackConstants } from "./constants";

import ChangeBucketBackTypeButton from "./ChangeBucketBackTypeButton";

const BucketBackTop = ({
  currentBucketBackType,
  setCurrentBucketBackType,
}: BucketBackTopPropsType) => {
  return (
    <>
      <ChangeBucketBackTypeButton
        type={bucketBackConstants.bucketBackType.controller}
        currentBucketBackType={currentBucketBackType}
        setCurrentBucketBackType={setCurrentBucketBackType}
      />
      <ChangeBucketBackTypeButton
        type={bucketBackConstants.bucketBackType.motivation}
        currentBucketBackType={currentBucketBackType}
        setCurrentBucketBackType={setCurrentBucketBackType}
      />
    </>
  );
};

export default BucketBackTop;
