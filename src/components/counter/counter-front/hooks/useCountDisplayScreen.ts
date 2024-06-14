import { useEffect, useState } from "react";

import { counterFrontConstants } from "../constants";

// countDisplayScreenType 상태를 관리하는 커스텀 훅.
const useCountDisplayScreen = (isInEndCount: boolean) => {
  // countDisplayScreenType을 관리하는 상태.
  const [countDisplayScreenType, setCountDisplayScreenType] = useState(
    counterFrontConstants.counterDisplayScreenType.default
  );

  // countDisplayScreenType 상태를 업데이트 하는 함수.
  const changeCountDisplayScreenType = (
    changedCountDisplayScreenType: number
  ) => setCountDisplayScreenType(changedCountDisplayScreenType);

  useEffect(() => {
    if (
      countDisplayScreenType ===
      counterFrontConstants.counterDisplayScreenType.negative
    ) {
      // countDisplayScreenType이 negative일 때의 screen은 애니메이션 시간 동안 보여졌다가 사라짐.
      // 하지만, 다시 countDisplayScreenType을 default로 되돌리는 유저 인터렉션이 없음.
      // 그래서, countDisplayScreenType 상태에 대한 side-effect를 활용하여, default로 되돌림.
      setTimeout(
        () =>
          changeCountDisplayScreenType(
            counterFrontConstants.counterDisplayScreenType.default
          ),
        500
      );
    }

    if (
      isInEndCount &&
      countDisplayScreenType !==
        counterFrontConstants.counterDisplayScreenType.positive
    ) {
      // 현재 count가 endCount를 달성했는데, counterDisplayScreenType가 positive가 되지 않은 상황에 대한 대비책.
      changeCountDisplayScreenType(
        counterFrontConstants.counterDisplayScreenType.positive
      );
    }
  }, [countDisplayScreenType, isInEndCount]);

  return { countDisplayScreenType, changeCountDisplayScreenType };
};

export default useCountDisplayScreen;
