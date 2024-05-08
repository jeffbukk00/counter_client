import Control from "@/components/ui/control/Control";
import BucketEditControlVector from "./assets/BucketEditControlVector";

const BucketEditControl = ({
  openBucketEditPhase,
}: {
  openBucketEditPhase: () => void;
}) => {
  return (
    <Control title="수정" action={openBucketEditPhase}>
      <BucketEditControlVector />
    </Control>
  );
};

export default BucketEditControl;
