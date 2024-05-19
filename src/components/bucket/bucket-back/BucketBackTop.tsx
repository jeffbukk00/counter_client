import { BucketBackTopPropsType } from "./types";
import { bucketBackConstants } from "./constants";

import ChangeBucketBackTypeButton from "./ChangeBucketBackTypeButton";

const BucketBackTop = ({
  currentBucketBackType,
  setCurrentBucketBackType,
}: BucketBackTopPropsType) => {
  return (
    <span className="absolute -top-7 right-1 flex justify-center items-center">
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
    </span>
  );
};

export default BucketBackTop;
