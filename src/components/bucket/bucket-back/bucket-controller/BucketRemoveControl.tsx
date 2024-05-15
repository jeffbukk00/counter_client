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
        mutateRemoveBucket();
        activate(bucketId);
      }}
    >
      <RemoveControlVector />
    </Control>
  );
};

export default BucketRemoveControl;
