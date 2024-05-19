import Control from "@/components/ui/control/Control";
import useMutationRemoveCounter from "./hooks/http/useMutationRemoveCounter";
import RemoveControlVector from "@/components/ui/control/assets/RemoveControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

const CounterRemoveControl = ({
  bucketId,
  counterId,
}: {
  bucketId: string;
  counterId: string;
}) => {
  const { mutateRemoveConter } = useMutationRemoveCounter(bucketId, counterId);
  const { activate } = useBoxLoadingContext();

  return (
    <>
      <Control
        title="삭제"
        action={() => {
          activate(counterId);
          mutateRemoveConter();
        }}
      >
        <RemoveControlVector classes="w-5 h-5 inline-block" />
      </Control>
    </>
  );
};

export default CounterRemoveControl;
