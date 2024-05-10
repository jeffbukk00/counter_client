import useMutationDuplicateBucket from "./hooks/http/useMutationDuplicateBucket";

import Control from "@/components/ui/control/Control";
import DuplicateControlVector from "../../../ui/control/assets/DuplicateControlVector";

const BucketDuplicateControl = ({ bucketId }: { bucketId: string }) => {
  const { mutateDuplicateBucket } = useMutationDuplicateBucket(bucketId);

  return (
    <Control title="복제" action={mutateDuplicateBucket}>
      <DuplicateControlVector />
    </Control>
  );
};

export default BucketDuplicateControl;
