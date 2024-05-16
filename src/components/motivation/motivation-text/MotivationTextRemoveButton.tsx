import { MotivationTextRemoveButtonPropsType } from "./types";

import useMutationRemoveMotivationText from "./hooks/http/useMutationRemoveMotivationText";

import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

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
    <button
      onClick={() => {
        activate(boxData.boxId);
        mutateRemoveMotivationText();
      }}
    >
      <RemoveControlVector />
    </button>
  );
};

export default MotivationTextRemoveButton;
