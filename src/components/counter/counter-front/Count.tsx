import { useState } from "react";

import { CounterFrontDataType } from "./types";
import { counterFrontConstants } from "./constants";

import useCountDisplayScreen from "./hooks/useCountDisplayScreen";
import useMutationUpdateCount from "./hooks/http/useMutationUpdateCount";
import useMutationUpdateAchievementStack from "./hooks/http/useMutationUpdateAchievementStack";

import OnEndCountButton from "./OnEndCountButton";
import CountCircle from "./CountCircle";
import CountDisplay from "./CountDisplay";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

const Count = ({
  counterFrontData,
}: {
  counterFrontData: CounterFrontDataType;
}) => {
  const [currentCount, setCurrentCount] = useState(
    counterFrontData.currentCount
  );

  const isInStartCount = currentCount === counterFrontData.startCount;
  const isInEndCount = currentCount === counterFrontData.endCount;

  const { countDisplayScreenType, changeCountDisplayScreenType } =
    useCountDisplayScreen(isInEndCount);

  useMutationUpdateCount(counterFrontData.id, currentCount);

  const { mutateUpdateAchievementStack } = useMutationUpdateAchievementStack(
    counterFrontData.id
  );
  const { activate } = useBoxLoadingContext();

  const getCloseToEndCount = (digit: number) => {
    let updatedCurrentCount: number;
    if (
      counterFrontData.direction === counterFrontConstants.counterDirection.up
    ) {
      updatedCurrentCount = currentCount + Math.pow(10, digit - 1);
      if (updatedCurrentCount >= counterFrontData.endCount) {
        updatedCurrentCount = counterFrontData.endCount;
        activate(counterFrontData.id);
        mutateUpdateAchievementStack(counterFrontData.achievementStack + 1);
      }
      return setCurrentCount(updatedCurrentCount);
    }

    if (
      counterFrontData.direction === counterFrontConstants.counterDirection.down
    ) {
      updatedCurrentCount = currentCount - Math.pow(10, digit - 1);
      if (updatedCurrentCount <= counterFrontData.endCount) {
        updatedCurrentCount = counterFrontData.endCount;
        activate(counterFrontData.id);
        mutateUpdateAchievementStack(counterFrontData.achievementStack + 1);
      }
      return setCurrentCount(updatedCurrentCount);
    }
  };

  const becomeDistantFromEndCount = (digit: number) => {
    if (isInStartCount) {
      changeCountDisplayScreenType(
        counterFrontConstants.counterDisplayScreenType.negative
      );
      return;
    }

    let updatedCurrentCount: number;

    if (
      counterFrontData.direction === counterFrontConstants.counterDirection.up
    ) {
      updatedCurrentCount = currentCount - Math.pow(10, digit - 1);
      if (updatedCurrentCount <= counterFrontData.startCount)
        updatedCurrentCount = counterFrontData.startCount;
      return setCurrentCount(updatedCurrentCount);
    }

    if (
      counterFrontData.direction === counterFrontConstants.counterDirection.down
    ) {
      updatedCurrentCount = currentCount + Math.pow(10, digit - 1);
      if (updatedCurrentCount >= counterFrontData.startCount)
        updatedCurrentCount = counterFrontData.startCount;
      return setCurrentCount(updatedCurrentCount);
    }
  };

  const resetCurrentCount = () => setCurrentCount(counterFrontData.startCount);

  return (
    <>
      {isInEndCount && (
        <OnEndCountButton
          changeCountDisplayScreenType={changeCountDisplayScreenType}
          resetCurrentCount={resetCurrentCount}
        />
      )}
      <span>
        <CountCircle
          countCircleType={counterFrontConstants.countCircleType.negative}
          startCount={counterFrontData.startCount}
          currentCount={currentCount}
          endCount={counterFrontData.endCount}
          direction={counterFrontData.direction}
        />
        <CountCircle
          countCircleType={counterFrontConstants.countCircleType.positive}
          startCount={counterFrontData.startCount}
          currentCount={currentCount}
          endCount={counterFrontData.endCount}
          direction={counterFrontData.direction}
        />
      </span>
      <CountDisplay
        direction={counterFrontData.direction}
        currentCount={currentCount}
        isInEndCount={isInEndCount}
        getCloseToEndCount={getCloseToEndCount}
        becomeDistantFromEndCount={becomeDistantFromEndCount}
        countDisplayScreenType={countDisplayScreenType}
      />
    </>
  );
};

export default Count;
