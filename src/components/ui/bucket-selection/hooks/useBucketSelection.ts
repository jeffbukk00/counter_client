import { useState } from "react";

// 선택한 bucket에 대한 상태를 관리하는 커스텀 훅.
const useBucketSelection = () => {
  // 유저에 의해 선택 된 bucket을 관리하는 상태.
  const [selectedBucket, setSelectedBucket] = useState<{
    id: string;
    title: string;
  } | null>(null);

  // 유저가 특정 bucket을 선택할 때 호출 되는 함수.
  const selectBucket = (bucketData: { id: string; title: string }) =>
    setSelectedBucket(bucketData);

  return { selectedBucket, selectBucket };
};

export default useBucketSelection;
