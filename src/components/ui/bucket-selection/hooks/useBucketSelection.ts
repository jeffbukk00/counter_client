import { useState } from "react";

const useBucketSelection = () => {
  const [selectedBucket, setSelectedBucket] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const selectBucket = (bucketData: { id: string; title: string }) =>
    setSelectedBucket(bucketData);

  return { selectedBucket, selectBucket };
};

export default useBucketSelection;
