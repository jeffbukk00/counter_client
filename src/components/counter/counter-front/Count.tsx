import { useState } from "react";

import { CounterFrontDataType } from "./types";
import { counterFrontConstants } from "./constants";

import useCountDisplayScreen from "./hooks/useCountDisplayScreen";
import useMutationUpdateAchievementStack from "./hooks/http/useMutationUpdateAchievementStack";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useMutationUpdateCount from "./hooks/http/useMutationUpdateCount";

import OnEndCountButton from "./OnEndCountButton";
import CountCircle from "./CountCircle";
import CountDisplay from "./CountDisplay";

// counter의 count를 관리하는 컴포넌트들 중, 최상위 컴포넌트.
const Count = ({
  counterFrontData,
}: {
  counterFrontData: CounterFrontDataType;
}) => {
  // 현재의 count를 관리하는 상태.
  const [currentCount, setCurrentCount] = useState(
    counterFrontData.currentCount
  );

  // 현재의 count가 startCount(시작으로 설정한 count)와 같은지에 대한 변수.
  const isInStartCount = currentCount === counterFrontData.startCount;
  // 현재의 count가 endCount(목표로 설정한 count)와 같은지에 대한 변수.
  const isInEndCount = currentCount === counterFrontData.endCount;

  // counter의 count를 업데이트 하기 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateUpdateCount } = useMutationUpdateCount(counterFrontData.id);
  // counter의 achievementStack을 업데이트 하기 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateUpdateAchievementStack } = useMutationUpdateAchievementStack(
    counterFrontData.id
  );

  // 현재의 count가 특수한 값으로 업데이트 되려할 때, 이에 따른 UI 변화를 위한 커스텀 훅.
  // 특수한 값의 count란, startCount보다 현재의 count가 작을 때 또는 endCount와 현재의 count가 같을 때.
  const { countDisplayScreenType, changeCountDisplayScreenType } =
    useCountDisplayScreen(isInEndCount);

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  // 현재의 count가  endCount에 가까워 지는 방향으로 업데이트 하는 함수.
  const getCloseToEndCount = (digit: number) => {
    // count의 업데이트는 총 6개의 값들로 이루어 진다.
    // 1, 10, 1000, 10000, 100000, 1000000

    let updatedCurrentCount: number;
    if (
      counterFrontData.direction === counterFrontConstants.counterDirection.up
    ) {
      // counter의 direction이 up일 때에는 더한다.
      updatedCurrentCount = currentCount + Math.pow(10, digit - 1);
      if (updatedCurrentCount >= counterFrontData.endCount) {
        // 업데이트 된 count가 endCount와 같거나 이를 초과하는 경우.
        // count 업데이트와 더불어, achievementStack 업데이트.

        // 초과 된 값들을 제외하고 endCount와 같아지게 업데이트.
        updatedCurrentCount = counterFrontData.endCount;
        setCurrentCount(updatedCurrentCount);

        // count를 업데이트 하기 위한 비동기 요청이 호출 됨에 따른 유저 피드백을 보여주기 위해 호출.
        activate(counterFrontData.id);
        // count를 업데이트 하기 위한 비동기 요청.
        mutateUpdateCount(updatedCurrentCount);

        // 지연 후, achievementStack을 업데이트 하기 위한 비동기 요청 호출.
        // 서버 상의 설계 상, "count 업데이트 => achievementStack 업데이트"의 순서가 지켜져야 함.
        setTimeout(() => {
          // achievementStack을 업데이트 하기 위한 비동기 요청이 호출 됨에 따른 유저 피드백을 보여주기 위해 호출.
          activate(counterFrontData.id);
          // achievementStack을 업데이트 하기 위한 비동기 요청.
          mutateUpdateAchievementStack(counterFrontData.achievementStack + 1);
        }, 200);
        return;
      } else {
        // 업데이트 된 count가 endCount보다 작은 경우.
        // achievementStack은 업데이트 하지 않음.

        setCurrentCount(updatedCurrentCount);
        activate(counterFrontData.id);
        mutateUpdateCount(updatedCurrentCount);
        return;
      }
    }

    if (
      counterFrontData.direction === counterFrontConstants.counterDirection.down
    ) {
      // counter의 direction이 down일 때에는 뺀다.
      updatedCurrentCount = currentCount - Math.pow(10, digit - 1);
      if (updatedCurrentCount <= counterFrontData.endCount) {
        // 업데이트 된 count가 endCount와 같거나 이보다 작은 경우.
        // count 업데이트와 더불어, achievementStack 업데이트.

        // endCount 미만의 값들을 제외하고 endCount와 같아지게 업데이트.
        updatedCurrentCount = counterFrontData.endCount;
        setCurrentCount(updatedCurrentCount);

        // count를 업데이트 하기 위한 비동기 요청이 호출 됨에 따른 유저 피드백을 보여주기 위해 호출.
        activate(counterFrontData.id);
        // count를 업데이트 하기 위한 비동기 요청.
        mutateUpdateCount(updatedCurrentCount);

        // 지연 후, achievementStack을 업데이트 하기 위한 비동기 요청 호출.
        // 서버 상의 설계 상, "count 업데이트 => achievementStack 업데이트"의 순서가 지켜져야 함.
        setTimeout(() => {
          // achievementStack을 업데이트 하기 위한 비동기 요청이 호출 됨에 따른 유저 피드백을 보여주기 위해 호출.
          activate(counterFrontData.id);
          // achievementStack을 업데이트 하기 위한 비동기 요청.
          mutateUpdateAchievementStack(counterFrontData.achievementStack + 1);
        }, 200);

        return;
      } else {
        // 업데이트 된 count가 endCount보다 큰 경우.
        // achievementStack은 업데이트 하지 않음.

        setCurrentCount(updatedCurrentCount);
        activate(counterFrontData.id);
        mutateUpdateCount(updatedCurrentCount);
        return;
      }
    }
  };

  // 현재의 count가 endCount로부터 멀어지는 방향으로 업데이트 하는 함수.
  const becomeDistantFromEndCount = (digit: number) => {
    // count의 업데이트는 총 6개의 값들로 이루어 진다.
    // 1, 10, 1000, 10000, 100000, 1000000

    // 현재의 count가 이미 startCount와 같은 경우.
    if (isInStartCount) {
      // 이 방향으로 업데이트 할 수 없다는 애니메이션(ui)을 보여주고, 업데이트 종료.
      changeCountDisplayScreenType(
        counterFrontConstants.counterDisplayScreenType.negative
      );
      return;
    }

    let updatedCurrentCount: number;

    if (
      counterFrontData.direction === counterFrontConstants.counterDirection.up
    ) {
      // counter의 direction이 up이면, 뺀다.
      updatedCurrentCount = currentCount - Math.pow(10, digit - 1);
      if (updatedCurrentCount <= counterFrontData.startCount) {
        // 업데이트한 count가 startCount보다 같거나 작다면,
        // startCount 미만의 값들을 제외하고 업데이트.
        updatedCurrentCount = counterFrontData.startCount;
      }

      setCurrentCount(updatedCurrentCount);

      // count를 업데이트 하기 위한 비동기 요청이 호출 됨에 따른 유저 피드백을 보여주기 위해 호출.
      activate(counterFrontData.id);
      // count를 업데이트 하기 위한 비동기 요청.
      mutateUpdateCount(updatedCurrentCount);
      return;
    }

    if (
      counterFrontData.direction === counterFrontConstants.counterDirection.down
    ) {
      // counter의 direction이 down이면, 더한다.
      updatedCurrentCount = currentCount + Math.pow(10, digit - 1);
      if (updatedCurrentCount >= counterFrontData.startCount) {
        // 업데이트한 count가 startCount보다 같거나 크다면,
        // startCount를 초과한 값들을 제외하고 업데이트.
        updatedCurrentCount = counterFrontData.startCount;
      }

      setCurrentCount(updatedCurrentCount);

      // count를 업데이트 하기 위한 비동기 요청이 호출 됨에 따른 유저 피드백을 보여주기 위해 호출.
      activate(counterFrontData.id);
      // count를 업데이트 하기 위한 비동기 요청.
      mutateUpdateCount(updatedCurrentCount);
      return;
    }
  };

  // 현재의 count를 관리하는 상태를 리셋하기 위한 함수.
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
