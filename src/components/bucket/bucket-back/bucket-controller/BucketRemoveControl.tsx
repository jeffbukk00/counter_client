import useMutationRemoveBucket from "./hooks/http/useMutationRemoveBucket";

import Control from "@/components/ui/control/Control";
import BucketRemoveControlVector from "./assets/BucketRemoveControlVector";

const BucketRemoveControl = ({ bucketId }: { bucketId: string }) => {
  const { mutateRemoveBucket } = useMutationRemoveBucket(bucketId);

  return (
    <Control title="삭제" action={mutateRemoveBucket}>
      <BucketRemoveControlVector />
    </Control>
  );
};

export default BucketRemoveControl;
