import { useState } from "react";

import { BucketBackBodyPropsType } from "./types";
import { bucketBackConstants } from "./constants";

import BucketEditPhase from "./BucketEditPhase";
import BucketController from "./bucket-controller/BucketController";
import Motivations from "@/components/motivation/Motivations";

const BucketBackBody = ({
  currentBucketBackType,
  bucketBackData,
}: BucketBackBodyPropsType) => {
  const [isBucketEditPhase, setIsBucketEditPhase] = useState(false);

  const openBucketEditPhase = () => setIsBucketEditPhase(true);
  const closeBucketEditPhase = () => setIsBucketEditPhase(false);

  console.log(currentBucketBackType);
  return (
    <>
      {isBucketEditPhase && (
        <BucketEditPhase
          closeBucketEditPhase={closeBucketEditPhase}
          bucketBackData={bucketBackData}
        />
      )}
      {!isBucketEditPhase &&
        currentBucketBackType ===
          bucketBackConstants.bucketBackType.controller && (
          <BucketController
            openBucketEditPhase={openBucketEditPhase}
            bucketBackData={bucketBackData}
          />
        )}
      {!isBucketEditPhase &&
        currentBucketBackType ===
          bucketBackConstants.bucketBackType.motivation && (
          <Motivations boxId={bucketBackData.id} />
        )}
    </>
  );
};

export default BucketBackBody;
