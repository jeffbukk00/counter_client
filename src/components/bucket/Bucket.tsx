import useQueryBucket from "./hooks/http/useQueryBucket";
import { BucketPropsType } from "./types";

import BucketFront from "./bucket-front/BucketFront";
import BucketBack from "./bucket-back/BucketBack";

const Bucket = ({ bucketId, isFront, isVisible }: BucketPropsType) => {
  const { bucketData, isLoading } = useQueryBucket(bucketId);

  if (isLoading) return <p>버킷을 요청 중입니다...</p>;

  const bucketFrontData = { id: bucketId, title: bucketData?.title };
  const bucketBackData = { id: bucketId, title: bucketData?.title };

  return (
    <>
      {isFront ? (
        <BucketFront bucketFrontData={bucketFrontData} isVisible={isVisible} />
      ) : (
        <BucketBack bucketBackData={bucketBackData} />
      )}
    </>
  );
};

export default Bucket;
