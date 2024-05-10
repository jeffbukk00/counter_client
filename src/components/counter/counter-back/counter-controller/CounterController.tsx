import { CounterControllerPropsType } from "./types";

import CounterDuplicateControl from "./CounterDuplicateControl";
import CounterEditControl from "./CounterEditControl";
import CounterMoveControl from "./CounterMoveControl";
import CounterResetControl from "./CounterResetControl";
import CounterRemoveControl from "./CounterRemoveControl";

const CounterController = ({
  openCounterEditPhase,
  counterBackData,
}: CounterControllerPropsType) => {
  return (
    <>
      <CounterEditControl openCounterEditPhase={openCounterEditPhase} />
      <CounterDuplicateControl
        bucketId={counterBackData.bucketId}
        counterId={counterBackData.id}
      />
      <CounterMoveControl counterBackData={counterBackData} />
      <CounterResetControl counterId={counterBackData.id} />
      <CounterRemoveControl
        bucketId={counterBackData.bucketId}
        counterId={counterBackData.id}
      />
    </>
  );
};

export default CounterController;
