import { useState } from "react";

import { BucketBackBodyPropsType } from "./types";
import { bucketBackConstants } from "./constants";
import { boxConstants } from "@/components/ui/box/constants";

import BucketEditPhase from "./BucketEditPhase";
import BucketController from "./bucket-controller/BucketController";
import Motivations from "@/components/motivation/Motivations";

// bucket 뒷면의 body에 해당. bucket 뒷면의 타입을 관리하는 기능 이외의 모든 기능이 여기에 있음.
const BucketBackBody = ({
  currentBucketBackType,
  bucketBackData,
}: BucketBackBodyPropsType) => {
  // bucket이 현재 수정 중인지 여부를 관리하는 상태.
  const [isBucketEditPhase, setIsBucketEditPhase] = useState(false);

  // bucket 수정 시작하는 함수.
  const openBucketEditPhase = () => setIsBucketEditPhase(true);
  // bucket 수정 끝내는 함수.
  const closeBucketEditPhase = () => setIsBucketEditPhase(false);

  return (
    <>
      {isBucketEditPhase &&
        currentBucketBackType ===
          bucketBackConstants.bucketBackType.controller && (
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
      {currentBucketBackType ===
        bucketBackConstants.bucketBackType.motivation && (
        <Motivations
          boxType={boxConstants.boxType.bucket}
          boxId={bucketBackData.id}
        />
      )}
    </>
  );
};

export default BucketBackBody;
