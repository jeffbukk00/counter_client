import { BucketSelectionListPropsType } from "./types";

import useQueryBuckets from "./hooks/http/useQueryBuckets";
import BucketSelection from "./BucketSelection";
import LoadingFeedbackModal from "../user-feedback/loading/LoadingFeedbackModal";

const BucketSelectionList = ({
  selectBucket,
}: BucketSelectionListPropsType) => {
  const { buckets, isLoading, isFetching } = useQueryBuckets();

  if (isLoading) return <LoadingFeedbackModal />;

  return (
    <>
      {isFetching && <LoadingFeedbackModal />}
      <ul className="w-full h-full overflow-y-scroll">
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
    </>
  );
};

export default BucketSelectionList;
