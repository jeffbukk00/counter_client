import { useState } from "react";

import { CounterFrontDataType } from "./types";
import { counterFrontConstants } from "./constants";

import useCountDisplayScreen from "./hooks/useCountDisplayScreen";

import useMutationUpdateAchievementStack from "./hooks/http/useMutationUpdateAchievementStack";

import OnEndCountButton from "./OnEndCountButton";
import CountCircle from "./CountCircle";
import CountDisplay from "./CountDisplay";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useMutationUpdateCount from "./hooks/http/useMutationUpdateCount";

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

  const { mutateUpdateCount } = useMutationUpdateCount(counterFrontData.id);
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
        setCurrentCount(updatedCurrentCount);
        activate(counterFrontData.id);
        mutateUpdateCount(updatedCurrentCount);

        setTimeout(() => {
          activate(counterFrontData.id);
          mutateUpdateAchievementStack(counterFrontData.achievementStack + 1);
        }, 200);
        return;
      }

      setCurrentCount(updatedCurrentCount);
      activate(counterFrontData.id);
      mutateUpdateCount(updatedCurrentCount);
      return;
    }

    if (
      counterFrontData.direction === counterFrontConstants.counterDirection.down
    ) {
      updatedCurrentCount = currentCount - Math.pow(10, digit - 1);
      if (updatedCurrentCount <= counterFrontData.endCount) {
        updatedCurrentCount = counterFrontData.endCount;
        setCurrentCount(updatedCurrentCount);
        activate(counterFrontData.id);
        mutateUpdateCount(updatedCurrentCount);
        activate(counterFrontData.id);
        mutateUpdateAchievementStack(counterFrontData.achievementStack + 1);
        return;
      }

      setCurrentCount(updatedCurrentCount);
      activate(counterFrontData.id);
      mutateUpdateCount(updatedCurrentCount);
      return;
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
      if (updatedCurrentCount <= counterFrontData.startCount) {
        updatedCurrentCount = counterFrontData.startCount;
      }

      setCurrentCount(updatedCurrentCount);
      activate(counterFrontData.id);
      mutateUpdateCount(updatedCurrentCount);
      return;
    }

    if (
      counterFrontData.direction === counterFrontConstants.counterDirection.down
    ) {
      updatedCurrentCount = currentCount + Math.pow(10, digit - 1);
      if (updatedCurrentCount >= counterFrontData.startCount) {
        updatedCurrentCount = counterFrontData.startCount;
      }

      setCurrentCount(updatedCurrentCount);
      activate(counterFrontData.id);
      mutateUpdateCount(updatedCurrentCount);
      return;
    }
  };

  const resetCurrentCount = () => setCurrentCount(counterFrontData.startCount);

  return (
    <>
      {isInEndCount && (
        <OnEndCountButton
          counterId={counterFrontData.id}
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
