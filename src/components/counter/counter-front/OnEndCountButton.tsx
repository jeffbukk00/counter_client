import { OnEndCountButtonPropsType } from "./types";
import { counterFrontConstants } from "./constants";

import OnEndCountButtonVector from "./assets/OnEndCountButtonVector";
import Control from "@/components/ui/control/Control";

const OnEndCountButton = ({
  changeCountDisplayScreenType,
  resetCurrentCount,
}: OnEndCountButtonPropsType) => {
  return (
    <Control
      title="리셋"
      action={() => {
        changeCountDisplayScreenType(
          counterFrontConstants.counterDisplayScreenType.default
        );
        resetCurrentCount();
      }}
    >
      <OnEndCountButtonVector />
    </Control>
  );
};

export default OnEndCountButton;
