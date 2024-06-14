import { useState } from "react";

import { CounterBackDataType } from "./types";
import { counterBackConstants } from "./constants";
import CounterBackTop from "./CounterBackTop";
import CounterBackBody from "./CounterBackBody";

// counter 뒷면에 대한 최상위 컴포넌트.
const CounterBack = ({
  counterBackData,
}: {
  counterBackData: CounterBackDataType;
}) => {
  // counter 뒷면의 타입을 관리하는 상태.
  const [currentCounterBackType, setCurrentCounterBackType] = useState(
    counterBackConstants.counterBackType.controller
  );

  return (
    <>
      <CounterBackTop
        currentCounterBackType={currentCounterBackType}
        setCurrentCounterBackType={setCurrentCounterBackType}
      />
      <CounterBackBody
        currentCounterBackType={currentCounterBackType}
        counterBackData={counterBackData}
      />
    </>
  );
};

export default CounterBack;
