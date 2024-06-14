import useMutationDuplicateCounter from "./hooks/http/useMutationDuplicateCounter";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

import Control from "@/components/ui/control/Control";
import DuplicateControlVector from "@/components/ui/control/assets/DuplicateControlVector";

// controller의 control들 중, counter 복제 역할을 하는 control.
const CounterDuplicateControl = ({
  bucketId,
  counterId,
}: {
  bucketId: string;
  counterId: string;
}) => {
  // counter 복제를 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateDuplicateCounter } = useMutationDuplicateCounter(
    bucketId,
    counterId
  );

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  return (
    <Control
      title="복제"
      action={() => {
        // counter 복제를 위한 비동기 요청이 호출 될 때, 로딩 상태에 대한 유저 피드백.
        activate(counterId);
        // counter 복제를 위한 비동기 요청이 호출
        mutateDuplicateCounter();
      }}
    >
      <DuplicateControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default CounterDuplicateControl;
