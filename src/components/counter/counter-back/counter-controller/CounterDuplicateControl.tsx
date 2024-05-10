import Control from "@/components/ui/control/Control";
import useMutationDuplicateCounter from "./hooks/http/useMutationDuplicateCounter";
import DuplicateControlVector from "@/components/ui/control/assets/DuplicateControlVector";

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

  return (
    <Control title="복제" action={mutateDuplicateCounter}>
      <DuplicateControlVector />
    </Control>
  );
};

export default CounterDuplicateControl;
