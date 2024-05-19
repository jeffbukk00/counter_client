import Control from "@/components/ui/control/Control";
import useMutationResetCount from "./hooks/http/useMutationResetCount";
import ResetControlVector from "@/components/ui/control/assets/ResetControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

const CounterResetControl = ({ counterId }: { counterId: string }) => {
  const { mutateResetCount } = useMutationResetCount(counterId);
  const { activate } = useBoxLoadingContext();

  return (
    <Control
      title="리셋"
      action={() => {
        activate(counterId);
        mutateResetCount();
      }}
    >
      <ResetControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default CounterResetControl;
