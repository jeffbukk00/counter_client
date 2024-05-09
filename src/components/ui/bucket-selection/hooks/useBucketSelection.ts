import { useState } from "react";

const useBucketSelection = () => {
  const [selectedBucket, setSelectedBucket] = useState({ id: "", title: "" });

  const selectBucket = (bucketData: { id: string; title: string }) =>
    setSelectedBucket(bucketData);

  return { selectedBucket, selectBucket };
};

export default useBucketSelection;
