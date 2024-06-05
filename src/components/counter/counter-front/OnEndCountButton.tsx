import { OnEndCountButtonPropsType } from "./types";
import { counterFrontConstants } from "./constants";

import ResetControlVector from "../../ui/control/assets/ResetControlVector";
import Control from "@/components/ui/control/Control";
import useMutationResetCount from "../counter-back/counter-controller/hooks/http/useMutationResetCount";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

const OnEndCountButton = ({
  changeCountDisplayScreenType,
  resetCurrentCount,
  counterId,
}: OnEndCountButtonPropsType) => {
  const { mutateResetCount } = useMutationResetCount(counterId);
  const { activate } = useBoxLoadingContext();

  return (
    <span className="absolute top-3 left-[50%] translate-x-[-50%]">
      <Control
        title="리셋"
        action={() => {
          changeCountDisplayScreenType(
            counterFrontConstants.counterDisplayScreenType.default
          );
          resetCurrentCount();
          activate(counterId);
          mutateResetCount(false);
        }}
      >
        <ResetControlVector classes="w-5 h-5 inline-block" />
      </Control>
    </span>
  );
};

export default OnEndCountButton;
