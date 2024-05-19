import { MotivationLinkRemoveButtonPropsType } from "./types";

import useMutationRemoveMotivationLink from "./hooks/http/useMutationRemoveMotivationLink";

import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import HoverWrapper from "@/components/styles/HoverWrapper";

const MotivationLinkRemoveBUtton = ({
  boxData,
  motivationLinkId,
  showRemoveButton,
  hideRemoveButton,
}: MotivationLinkRemoveButtonPropsType) => {
  const { mutateRemoveMotivationLink } = useMutationRemoveMotivationLink(
    boxData.boxId,
    boxData.boxType,
    motivationLinkId
  );
  const { activate } = useBoxLoadingContext();

  return (
    <div
      className="absolute bottom-1 left-0 w-full flex justify-center items-center"
      onMouseOver={showRemoveButton}
      onMouseOut={hideRemoveButton}
    >
      <HoverWrapper classes="p-[1px]">
        <button
          onClick={() => {
            activate(boxData.boxId);
            mutateRemoveMotivationLink();
          }}
          className="flex justify-center items-center"
        >
          <RemoveControlVector classes="w-5 h-5 inline-block" />
        </button>
      </HoverWrapper>
    </div>
  );
};

export default MotivationLinkRemoveBUtton;
