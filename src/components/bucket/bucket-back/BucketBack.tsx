import { useState } from "react";

import { BucketBackPropsType } from "./types";
import { bucketBackConstants } from "./constants";

import BucketBackTop from "./BucketBackTop";
import BucketBackBody from "./BucketBackBody";
import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

const BucketBack = ({ bucketBackData }: BucketBackPropsType) => {
  const [currentBucketBackType, setCurrentBucketBackType] = useState(
    bucketBackConstants.bucketBackType.controller
  );

  useBoxGuide(guideConstants.guideIds["guideId3"], bucketBackData.id);

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
