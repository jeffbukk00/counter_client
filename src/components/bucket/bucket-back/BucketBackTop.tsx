import { BucketBackTopPropsType } from "./types";
import { bucketBackConstants } from "./constants";

import ChangeBucketBackTypeButton from "./ChangeBucketBackTypeButton";

// bucket의 뒷면의 top. bucket의 뒷면의 타입을 관리하는 역할을 하는 컴포넌트.
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
