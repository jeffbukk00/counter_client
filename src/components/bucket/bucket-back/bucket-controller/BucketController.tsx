import { BucketControllerPropsType } from "./types";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";

import BucketEditControl from "./BucketEditControl";
import BucketDuplicateControl from "./BucketDuplicateControl";
import BucketMergeControl from "./BucketMergeControl";
import BucketRemoveControl from "./BucketRemoveControl";

// bucket의 controller의 최상위 컴포넌트.
// controller는 수정, 복제, 삭제 등 bucket에 대한 기본적인 조작을 담당.
const BucketController = ({
  openBucketEditPhase,
  bucketBackData,
}: BucketControllerPropsType) => {
  // 유저가 화면 상에서 이 컴포넌트를 보게 되었을 때, 해당하는 가이드를 동반하여 표시하기 위해 호출.
  useBoxGuide(guideConstants.guideIds["guideId3"], bucketBackData.id);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-center gap-2">
        <BucketEditControl openBucketEditPhase={openBucketEditPhase} />
        <BucketDuplicateControl bucketId={bucketBackData.id} />
        <BucketMergeControl bucketBackData={bucketBackData} />
        <BucketRemoveControl bucketId={bucketBackData.id} />
      </div>
    </div>
  );
};

export default BucketController;
