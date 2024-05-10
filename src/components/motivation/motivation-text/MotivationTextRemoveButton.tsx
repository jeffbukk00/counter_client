import { MotivationTextRemoveButtonPropsType } from "./types";

import useMutationRemoveMotivationText from "./hooks/http/useMutationRemoveMotivationText";

import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";

const MotivationTextRemoveButton = ({
  boxData,
  motivationTextId,
}: MotivationTextRemoveButtonPropsType) => {
  const { mutateRemoveMotivationText } = useMutationRemoveMotivationText(
    boxData.boxId,
    boxData.boxType,
    motivationTextId
  );
  return (
    <button onClick={() => mutateRemoveMotivationText()}>
      <RemoveControlVector />
    </button>
  );
};

export default MotivationTextRemoveButton;
