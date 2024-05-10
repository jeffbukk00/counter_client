import Control from "@/components/ui/control/Control";
import useMutationRemoveCounter from "./hooks/http/useMutationRemoveCounter";
import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";

const CounterRemoveControl = ({
  bucketId,
  counterId,
}: {
  bucketId: string;
  counterId: string;
}) => {
  const { mutateRemoveConter } = useMutationRemoveCounter(bucketId, counterId);
  return (
    <Control title="삭제" action={mutateRemoveConter}>
      <RemoveControlVector />
    </Control>
  );
};

export default CounterRemoveControl;
