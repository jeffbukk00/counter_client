import Control from "@/components/ui/control/Control";
import useMutationDuplicateCounter from "./hooks/http/useMutationDuplicateCounter";
import DuplicateControlVector from "@/components/ui/control/assets/DuplicateControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

const CounterDuplicateControl = ({
  bucketId,
  counterId,
}: {
  bucketId: string;
  counterId: string;
}) => {
  const { mutateDuplicateCounter } = useMutationDuplicateCounter(
    bucketId,
    counterId
  );
  const { activate } = useBoxLoadingContext();

  return (
    <Control
      title="복제"
      action={() => {
        activate(counterId);
        mutateDuplicateCounter();
      }}
    >
      <DuplicateControlVector />
    </Control>
  );
};

export default CounterDuplicateControl;
