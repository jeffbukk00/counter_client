import { MotivationTextRemoveButtonPropsType } from "./types";

import useMutationRemoveMotivationText from "./hooks/http/useMutationRemoveMotivationText";

import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import HoverWrapper from "@/components/styles/HoverWrapper";

const MotivationTextRemoveButton = ({
  boxData,
  motivationTextId,
}: MotivationTextRemoveButtonPropsType) => {
  const { mutateRemoveMotivationText } = useMutationRemoveMotivationText(
    boxData.boxId,
    boxData.boxType,
    motivationTextId
  );
  const { activate } = useBoxLoadingContext();

  return (
    <HoverWrapper classes="p-[1px]">
      <button
        onClick={() => {
          activate(boxData.boxId);
          mutateRemoveMotivationText();
        }}
        className="flex justify-center items-center"
      >
        <RemoveControlVector classes="w-5 h-5 inline-block" />
      </button>
    </HoverWrapper>
  );
};

export default MotivationTextRemoveButton;
