import { useEffect, useState } from "react";

import { counterFrontConstants } from "../constants";

const useCountDisplayScreen = (isInEndCount: boolean) => {
  const [countDisplayScreenType, setCountDisplayScreenType] = useState(
    counterFrontConstants.counterDisplayScreenType.default
  );

  const changeCountDisplayScreenType = (
    changedCountDisplayScreenType: number
  ) => setCountDisplayScreenType(changedCountDisplayScreenType);

  useEffect(() => {
    if (
      countDisplayScreenType ===
      counterFrontConstants.counterDisplayScreenType.negative
    ) {
      //애니메이션 시간만큼 지연
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
      changeCountDisplayScreenType(
        counterFrontConstants.counterDisplayScreenType.positive
      );
    }
  }, [countDisplayScreenType, isInEndCount]);

  return { countDisplayScreenType, changeCountDisplayScreenType };
};

export default useCountDisplayScreen;
