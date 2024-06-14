import Control from "@/components/ui/control/Control";
import useMutationResetCount from "./hooks/http/useMutationResetCount";
import ResetControlVector from "@/components/ui/control/assets/ResetControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

// controller의 control들 중, counter의 count 리셋에 대한 control.
const CounterResetControl = ({ counterId }: { counterId: string }) => {
  // counter의 count 리셋을 위한 비동기 요청을 담고 있는 커스텀 훅.
  const { mutateResetCount } = useMutationResetCount(counterId);

  // box의 로딩 상태에 따른 유저 피드백을 관리하는 커스텀 훅.
  // 여기서는 box가 로딩 상태로 전환되었을 때, 유저 피드백을 화면 상에 표시하기 위해 호출하는 함수를 반환.
  const { activate } = useBoxLoadingContext();

  return (
    <Control
      title="리셋"
      action={() => {
        // counter의 count 리셋을 위한 비동기 요청이 호출 될 때, 로딩 상태에 대한 유저 피드백.
        activate(counterId);
        // counter의 count 리셋을 위한 비동기 요청이 호출.
        // count history까지 리셋.
        mutateResetCount(true);
      }}
    >
      <ResetControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default CounterResetControl;
