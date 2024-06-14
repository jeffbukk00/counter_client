import useCreationStart from "../ui/creator/hooks/useCreationStart";

import BucketCreationPhase from "./BucketCreationPhase";
import BucketCreationStart from "./BucketCreationStart";

// bucket을 생성하는 기능을 수행하는 컴포넌트들 중, 최상위 컴포넌트.
const BucketCreator = () => {
  // bucket을 생성 중인지 상태를 관리하는 커스텀 훅.
  const { creationIsStarted, startCreation, finishCreation } =
    useCreationStart();

  return (
    <>
      {creationIsStarted && (
        <BucketCreationPhase finishCreation={finishCreation} />
      )}
      {!creationIsStarted && (
        <BucketCreationStart startCreation={startCreation} />
      )}
    </>
  );
};

export default BucketCreator;
