import { MotivationLinkRemoveButtonPropsType } from "./types";

import useMutationRemoveMotivationLink from "./hooks/http/useMutationRemoveMotivationLink";

import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";

const MotivationLinkRemoveBUtton = ({
  boxData,
  motivationLinkId,
}: MotivationLinkRemoveButtonPropsType) => {
  const { mutateRemoveMotivationLink } = useMutationRemoveMotivationLink(
    boxData.boxId,
    boxData.boxType,
    motivationLinkId
  );

  return (
    <button onClick={() => mutateRemoveMotivationLink()}>
      <RemoveControlVector />
    </button>
  );
};

export default MotivationLinkRemoveBUtton;
