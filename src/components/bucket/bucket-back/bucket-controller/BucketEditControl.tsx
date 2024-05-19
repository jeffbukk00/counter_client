import Control from "@/components/ui/control/Control";
import EditControlVector from "../../../ui/control/assets/EditControlVector";

const BucketEditControl = ({
  openBucketEditPhase,
}: {
  openBucketEditPhase: () => void;
}) => {
  return (
    <Control title="수정" action={openBucketEditPhase}>
      <EditControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default BucketEditControl;
