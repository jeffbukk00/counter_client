import { BucketSelectionListPropsType } from "./types";

import useQueryBuckets from "./hooks/http/useQueryBuckets";

import BucketSelection from "./BucketSelection";
import LoadingFeedbackModal from "../user-feedback/loading/LoadingFeedbackModal";

// 모든 bucket들이 포함된 리스트에서, 특정 bucket을 선택하는 용도의 컴포넌트.
const BucketSelectionList = ({
  selectBucket,
}: BucketSelectionListPropsType) => {
  // 모든 bucket들의 데이터를 불러오는 비동기 요청을 호출하는 커스텀 훅.
  const { buckets, isLoading, isFetching } = useQueryBuckets();

  // 모든 bucket들의 데이터를 불러오는 비동기 요청이 로딩 상태일 때, 유저 피드백.
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
                // 특정 bucket을 선택하도록 인자를 미리 바인딩.
                selectBucket({ id: e._id, title: e.title })
              }
            />
          ))}
      </ul>
    </>
  );
};

export default BucketSelectionList;
