import { counterBackConstants } from "./constants";
import { CounterBackTopPropsType } from "./types";

import ChangeCounterBackTypeButton from "./ChangeCounterBackTypeButton";

// counter 뒷면의 top. counter 뒷면의 타입을 관리하는 컴포넌트.
const CounterBackTop = ({
  currentCounterBackType,
  setCurrentCounterBackType,
}: CounterBackTopPropsType) => {
  return (
    <span className="absolute -top-7 right-1 flex justify-center items-center">
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
        type={counterBackConstants.counterBackType.history}
        currentCounterBackType={currentCounterBackType}
        setCurrentCounterBackType={setCurrentCounterBackType}
      />
      <ChangeCounterBackTypeButton
        type={counterBackConstants.counterBackType.motivation}
        currentCounterBackType={currentCounterBackType}
        setCurrentCounterBackType={setCurrentCounterBackType}
      />
    </span>
  );
};

export default CounterBackTop;
