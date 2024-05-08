import { useState } from "react";

import { BucketBackPropsType } from "./types";
import { bucketBackConstants } from "./constants";

import BucketBackTop from "./BucketBackTop";
import BucketBackBody from "./BucketBackBody";

const BucketBack = ({ bucketBackData }: BucketBackPropsType) => {
  const [currentBucketBackType, setCurrentBucketBackType] = useState(
    bucketBackConstants.bucketBackType.controller
  );

  return (
    <>
      <BucketBackTop
        currentBucketBackType={currentBucketBackType}
        setCurrentBucketBackType={setCurrentBucketBackType}
      />
      <BucketBackBody />
    </>
  );
};

export default BucketBack;
