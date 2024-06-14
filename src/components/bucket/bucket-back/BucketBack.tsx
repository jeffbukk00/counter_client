import { useState } from "react";

import { BucketBackPropsType } from "./types";
import { bucketBackConstants } from "./constants";

import BucketBackTop from "./BucketBackTop";
import BucketBackBody from "./BucketBackBody";

// bucket의 뒤면에 대한 최상위 컴포넌트.
const BucketBack = ({ bucketBackData }: BucketBackPropsType) => {
  // bucket 뒷면의 타입을 관리하는 상태.
  const [currentBucketBackType, setCurrentBucketBackType] = useState(
    bucketBackConstants.bucketBackType.controller
  );

  return (
    <>
      <BucketBackTop
        currentBucketBackType={currentBucketBackType}
        setCurrentBucketBackType={setCurrentBucketBackType}
      />
      <BucketBackBody
        currentBucketBackType={currentBucketBackType}
        bucketBackData={bucketBackData}
      />
    </>
  );
};

export default BucketBack;
