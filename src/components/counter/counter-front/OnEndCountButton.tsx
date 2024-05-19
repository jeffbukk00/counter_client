import { OnEndCountButtonPropsType } from "./types";
import { counterFrontConstants } from "./constants";

import ResetControlVector from "../../ui/control/assets/ResetControlVector";
import Control from "@/components/ui/control/Control";

const OnEndCountButton = ({
  changeCountDisplayScreenType,
  resetCurrentCount,
}: OnEndCountButtonPropsType) => {
  return (
    <span className="absolute top-3 left-[50%] translate-x-[-50%]">
      <Control
        title="리셋"
        action={() => {
          changeCountDisplayScreenType(
            counterFrontConstants.counterDisplayScreenType.default
          );
          resetCurrentCount();
        }}
      >
        <ResetControlVector classes="w-5 h-5 inline-block" />
      </Control>
    </span>
  );
};

export default OnEndCountButton;
