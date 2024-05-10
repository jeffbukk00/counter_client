import { useState } from "react";

import { CounterBackDataType } from "./types";
import { counterBackConstants } from "./constants";
import CounterBackTop from "./CounterBackTop";
import CounterBackBody from "./CounterBackBody";

const CounterBack = ({
  counterBackData,
}: {
  counterBackData: CounterBackDataType;
}) => {
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
