import { MotivationLinkRemoveButtonPropsType } from "./types";

import useMutationRemoveMotivationLink from "./hooks/http/useMutationRemoveMotivationLink";

import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

const MotivationLinkRemoveBUtton = ({
  boxData,
  motivationLinkId,
}: MotivationLinkRemoveButtonPropsType) => {
  const { mutateRemoveMotivationLink } = useMutationRemoveMotivationLink(
    boxData.boxId,
    boxData.boxType,
    motivationLinkId
  );
  const { activate } = useBoxLoadingContext();

  return (
    <button
      onClick={() => {
        activate(boxData.boxId);
        mutateRemoveMotivationLink();
      }}
    >
      <RemoveControlVector />
    </button>
  );
};

export default MotivationLinkRemoveBUtton;
