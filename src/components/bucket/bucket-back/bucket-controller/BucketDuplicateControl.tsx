import useMutationDuplicateBucket from "./hooks/http/useMutationDuplicateBucket";

import Control from "@/components/ui/control/Control";
import DuplicateControlVector from "../../../ui/control/assets/DuplicateControlVector";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

const BucketDuplicateControl = ({ bucketId }: { bucketId: string }) => {
  const { mutateDuplicateBucket } = useMutationDuplicateBucket(bucketId);

  const { activate } = useBoxLoadingContext();

  return (
    <Control
      title="복제"
      action={() => {
        activate(bucketId);
        mutateDuplicateBucket();
      }}
    >
      <DuplicateControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default BucketDuplicateControl;
