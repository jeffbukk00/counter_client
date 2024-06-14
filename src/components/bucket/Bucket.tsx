import { BucketPropsType } from "./types";

import useQueryBucket from "./hooks/http/useQueryBucket";

import BucketFront from "./bucket-front/BucketFront";
import BucketBack from "./bucket-back/BucketBack";
import LoadingFeedbackBox from "../ui/user-feedback/loading/LoadingFeedbackBox";

// 단일 bucket에 대한 최상위 컴포넌트.
const Bucket = ({ bucketId, isFront, isVisible }: BucketPropsType) => {
  // 단일 bucket 데이터를 불러오는 비동기 요청을 보내고 그 상태를 관리하는 커스텀 훅.
  const { bucketData, isLoading, isFetching } = useQueryBucket(bucketId);

  // 단일 bucket 데이터를 불러오는 비동기 요청이 로딩 상태 일 때, 유저 피드백.
  if (isLoading) return <LoadingFeedbackBox />;

  // bucket의 가장 기본적인 두가지 상태: bucket의 앞면과 bucket의 뒷면.
  // 각각의 상태를 위한 데이터 분류.
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
