import { useState } from "react";

import { CounterBackBodyPropsType } from "./types";
import { counterBackConstants } from "./constants";
import { boxConstants } from "@/components/ui/box/constants";

import CounterEditPhase from "./CounterEditPhase";
import CounterController from "./counter-controller/CounterController";
import CounterAchievementStack from "./counter-achievement-stack/CounterAchievementStack";
import Motivations from "@/components/motivation/Motivations";
import OpenCounterHistoryPhase from "./OpenCounterHistoryPhase";

// counter 뒷면의 body에 해당. counter 뒷면의 타입을 관리하는 기능 이외의 모든 기능이 여기에 있음.
const CounterBackBody = ({
  currentCounterBackType,
  counterBackData,
}: CounterBackBodyPropsType) => {
  // counter가 수정 중인지를 관리하는 상태.
  const [isCounterEditPhase, setIsCounterEditPhase] = useState(false);

  // counter 수정을 시작하는 함수.
  const openCounterEditPhase = () => setIsCounterEditPhase(true);
  // counter 수정을 종료하는 함수.
  const closeCounterEditPhase = () => setIsCounterEditPhase(false);
  return (
    <>
      {isCounterEditPhase &&
        currentCounterBackType ===
          counterBackConstants.counterBackType.controller && (
          <CounterEditPhase
            closeCounterEditPhase={closeCounterEditPhase}
            counterBackData={counterBackData}
          />
        )}
      {!isCounterEditPhase &&
        currentCounterBackType ===
          counterBackConstants.counterBackType.controller && (
          <CounterController
            openCounterEditPhase={openCounterEditPhase}
            counterBackData={counterBackData}
          />
        )}
      {currentCounterBackType ===
        counterBackConstants.counterBackType.achievementStack && (
        <CounterAchievementStack
          currentAchievementStack={counterBackData.achievementStack}
          counterId={counterBackData.id}
        />
      )}
      {currentCounterBackType ===
        counterBackConstants.counterBackType.history && (
        <OpenCounterHistoryPhase
          counterId={counterBackData.id}
          title={counterBackData.title}
        />
      )}
      {currentCounterBackType ===
        counterBackConstants.counterBackType.motivation && (
        <Motivations
          boxType={boxConstants.boxType.counter}
          boxId={counterBackData.id}
        />
      )}
    </>
  );
};

export default CounterBackBody;
