import { MotivationTextRemoveButtonPropsType } from "./types";

import useMutationRemoveMotivationText from "./hooks/http/useMutationRemoveMotivationText";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

// 클릭하면 motivationText를 제거하는 버튼 컴포넌트.
const MotivationTextRemoveButton = ({
  boxData,
  motivationTextId,
}: MotivationTextRemoveButtonPropsType) => {
  // motivationText를 제거하는 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateRemoveMotivationText } = useMutationRemoveMotivationText(
    boxData.boxId,
    boxData.boxType,
    motivationTextId
  );

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  return (
    <HoverWrapper classes="p-[1px]">
      <button
        onClick={() => {
          // motivationText 제거를 위한 비동기 요청이 호출 될 때, 로딩 상태에 대한 유저 피드백.
          activate(boxData.boxId);

          // motivationText 제거를 위한 비동기 요청이 호출.
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
