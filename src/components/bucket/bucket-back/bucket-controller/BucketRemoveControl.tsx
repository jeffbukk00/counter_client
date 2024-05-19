import useMutationRemoveBucket from "./hooks/http/useMutationRemoveBucket";

import Control from "@/components/ui/control/Control";
import RemoveControlVector from "../../../ui/control/assets/RemoveControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

const BucketRemoveControl = ({ bucketId }: { bucketId: string }) => {
  const { mutateRemoveBucket } = useMutationRemoveBucket(bucketId);
  const { activate } = useBoxLoadingContext();

  return (
    <Control
      title="삭제"
      action={() => {
        activate(bucketId);
        mutateRemoveBucket();
      }}
    >
      <RemoveControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default BucketRemoveControl;
