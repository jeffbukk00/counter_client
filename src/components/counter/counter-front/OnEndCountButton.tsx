import { OnEndCountButtonPropsType } from "./types";
import { counterFrontConstants } from "./constants";

import ResetControlVector from "../../ui/control/assets/ResetControlVector";
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
      <ResetControlVector />
    </Control>
  );
};

export default OnEndCountButton;
