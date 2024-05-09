import useMutationDuplicateBucket from "./hooks/http/useMutationDuplicateBucket";

import Control from "@/components/ui/control/Control";
import BucketDuplicateControlVector from "./assets/BucketDuplicateControlVector";

const BucketDuplicateControl = ({ bucketId }: { bucketId: string }) => {
  const { mutateDuplicateBucket } = useMutationDuplicateBucket(bucketId);

  return (
    <Control title="복제" action={mutateDuplicateBucket}>
      <BucketDuplicateControlVector />
    </Control>
  );
};

export default BucketDuplicateControl;
