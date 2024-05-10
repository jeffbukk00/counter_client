import { useState } from "react";

import { CounterBackBodyPropsType } from "./types";
import { counterBackConstants } from "./constants";
import { boxConstants } from "@/components/ui/box/constants";

import CounterEditPhase from "./CounterEditPhase";
import CounterController from "./counter-controller/CounterController";
import CounterAchievementStack from "./counter-achievement-stack/CounterAchievementStack";
import Motivations from "@/components/motivation/Motivations";

const CounterBackBody = ({
  currentCounterBackType,
  counterBackData,
}: CounterBackBodyPropsType) => {
  const [isCounterEditPhase, setIsCounterEditPhase] = useState(false);

  const openCounterEditPhase = () => setIsCounterEditPhase(true);
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
