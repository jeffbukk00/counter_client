import useCreationStart from "../ui/creator/hooks/useCreationStart";

import BucketCreationPhase from "./BucketCreationPhase";
import BucketCreationStart from "./BucketCreationStart";

const BucketCreator = () => {
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
