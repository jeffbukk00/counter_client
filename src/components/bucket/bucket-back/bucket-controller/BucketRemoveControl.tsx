import useMutationRemoveBucket from "./hooks/http/useMutationRemoveBucket";

import Control from "@/components/ui/control/Control";
import RemoveControlVector from "../../../ui/control/assets/RemoveControlVector";

const BucketRemoveControl = ({ bucketId }: { bucketId: string }) => {
  const { mutateRemoveBucket } = useMutationRemoveBucket(bucketId);

  return (
    <Control title="삭제" action={mutateRemoveBucket}>
      <RemoveControlVector />
    </Control>
  );
};

export default BucketRemoveControl;
