import useQueryBucket from "./hooks/http/useQueryBucket";
import { BucketPropsType } from "./types";

import BucketFront from "./bucket-front/BucketFront";
import BucketBack from "./bucket-back/BucketBack";
import LoadingFeedbackBox from "../ui/user-feedback/loading/LoadingFeedbackBox";

const Bucket = ({ bucketId, isFront, isVisible }: BucketPropsType) => {
  const { bucketData, isLoading, isFetching } = useQueryBucket(bucketId);

  if (isLoading) return <LoadingFeedbackBox />;

  const bucketFrontData = { id: bucketId, title: bucketData?.title };
  const bucketBackData = { id: bucketId, title: bucketData?.title };

  return (
    <>
      {isFetching && <LoadingFeedbackBox />}
      {isFront ? (
        <BucketFront bucketFrontData={bucketFrontData} isVisible={isVisible} />
      ) : (
        <BucketBack bucketBackData={bucketBackData} />
      )}
    </>
  );
};

export default Bucket;
