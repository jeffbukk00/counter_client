import { BucketSelectionListPropsType } from "./types";

import useQueryBuckets from "./hooks/http/useQueryBuckets";
import BucketSelection from "./BucketSelection";

const BucketSelectionList = ({
  selectBucket,
}: BucketSelectionListPropsType) => {
  const { buckets, isLoading } = useQueryBuckets();

  if (isLoading) return <p>버킷들을 요청 중입니다...</p>;

  return (
    <ul>
      {buckets &&
        buckets.map((e) => (
          <BucketSelection
            key={e._id}
            title={e.title}
            selectBucketHandler={() =>
              selectBucket({ id: e._id, title: e.title })
            }
          />
        ))}
    </ul>
  );
};

export default BucketSelectionList;
