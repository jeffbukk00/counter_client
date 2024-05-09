import useCreationStart from "../ui/box-creator/hooks/useCreationStart";

import CounterCreationPhase from "./CounterCreationPhase";
import StartCreationButton from "../ui/box-creator/StartCreationButton";

const CounterCreator = ({ bucketId }: { bucketId: string }) => {
  const { creationIsStarted, startCreation, finishCreation } =
    useCreationStart();

  return (
    <>
      {creationIsStarted && (
        <CounterCreationPhase
          finishCreation={finishCreation}
          bucketId={bucketId}
        />
      )}
      {!creationIsStarted && (
        <StartCreationButton startCreation={startCreation} />
      )}
    </>
  );
};

export default CounterCreator;
