import { counterBackConstants } from "./constants";
import { CounterBackTopPropsType } from "./types";

import ChangeCounterBackTypeButton from "./ChangeCounterBackTypeButton";

const CounterBackTop = ({
  currentCounterBackType,
  setCurrentCounterBackType,
}: CounterBackTopPropsType) => {
  return (
    <>
      <ChangeCounterBackTypeButton
        type={counterBackConstants.counterBackType.controller}
        currentCounterBackType={currentCounterBackType}
        setCurrentCounterBackType={setCurrentCounterBackType}
      />
      <ChangeCounterBackTypeButton
        type={counterBackConstants.counterBackType.achievementStack}
        currentCounterBackType={currentCounterBackType}
        setCurrentCounterBackType={setCurrentCounterBackType}
      />
      <ChangeCounterBackTypeButton
        type={counterBackConstants.counterBackType.motivation}
        currentCounterBackType={currentCounterBackType}
        setCurrentCounterBackType={setCurrentCounterBackType}
      />
    </>
  );
};

export default CounterBackTop;
