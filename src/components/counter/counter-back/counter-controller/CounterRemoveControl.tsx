import useMutationRemoveCounter from "./hooks/http/useMutationRemoveCounter";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

import Control from "@/components/ui/control/Control";
import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";

// controller의 control들 중, counter 제거를 위한 control.
const CounterRemoveControl = ({
  bucketId,
  counterId,
}: {
  bucketId: string;
  counterId: string;
}) => {
  // counter 제거를 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateRemoveConter } = useMutationRemoveCounter(bucketId, counterId);

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  return (
    <>
      <Control
        title="삭제"
        action={() => {
          // counter 제거를 위한 비동기 요청이 호출 될 때, 로딩 상태에 대한 유저 피드백.
          activate(counterId);
          // counter 제거를 위한 비동기 요청이 호출.
          mutateRemoveConter();
        }}
      >
        <RemoveControlVector classes="w-5 h-5 inline-block" />
      </Control>
    </>
  );
};

export default CounterRemoveControl;
