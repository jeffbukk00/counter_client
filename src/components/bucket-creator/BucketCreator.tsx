import useCreationStart from "../ui/creator/hooks/useCreationStart";

import StartCreationButton from "../ui/creator/StartCreationButton";

import BucketCreationPhase from "./BucketCreationPhase";

const BucketCreator = () => {
  const { creationIsStarted, startCreation, finishCreation } =
    useCreationStart();

  return (
    <>
      {creationIsStarted && (
        <BucketCreationPhase finishCreation={finishCreation} />
      )}
      {!creationIsStarted && (
        <StartCreationButton startCreation={startCreation} />
      )}
    </>
  );
};

export default BucketCreator;
