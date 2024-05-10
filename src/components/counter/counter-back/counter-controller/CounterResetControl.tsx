import Control from "@/components/ui/control/Control";
import useMutationResetCount from "./hooks/http/useMutationResetCount";
import ResetControlVector from "@/components/ui/control/assets/ResetControlVector";

const CounterResetControl = ({ counterId }: { counterId: string }) => {
  const { mutateResetCount } = useMutationResetCount(counterId);
  return (
    <Control title="리셋" action={mutateResetCount}>
      <ResetControlVector />
    </Control>
  );
};

export default CounterResetControl;
