import { useState } from "react";

import { CounterBackDataType } from "./types";
import { counterBackConstants } from "./constants";
import CounterBackTop from "./CounterBackTop";
import CounterBackBody from "./CounterBackBody";
import useBoxGuide from "@/components/ui/user-feedback/guide/hooks/useBoxGuide";
import { guideConstants } from "@/components/ui/user-feedback/guide/constants";

const CounterBack = ({
  counterBackData,
}: {
  counterBackData: CounterBackDataType;
}) => {
  const [currentCounterBackType, setCurrentCounterBackType] = useState(
    counterBackConstants.counterBackType.controller
  );
  useBoxGuide(guideConstants.guideIds["guideId7"], counterBackData.id);

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
