import Control from "@/components/ui/control/Control";
import useMutationRemoveCounter from "./hooks/http/useMutationRemoveCounter";
import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";
import LoadingFeedbackBox from "@/components/ui/user-feedback/loading/LoadingFeedbackBox";

const CounterRemoveControl = ({
  bucketId,
  counterId,
}: {
  bucketId: string;
  counterId: string;
}) => {
  const { mutateRemoveConter, isPending } = useMutationRemoveCounter(
    bucketId,
    counterId
  );
  return (
    <>
      <LoadingFeedbackBox isLoading={isPending} />
      <Control title="삭제" action={mutateRemoveConter}>
        <RemoveControlVector />
      </Control>
    </>
  );
};

export default CounterRemoveControl;
