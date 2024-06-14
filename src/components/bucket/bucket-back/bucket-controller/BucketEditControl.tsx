import Control from "@/components/ui/control/Control";
import EditControlVector from "../../../ui/control/assets/EditControlVector";

// bucket의 controller의 control들 중, bucket 수정을 담당하는 control.
const BucketEditControl = ({
  openBucketEditPhase,
}: {
  openBucketEditPhase: () => void;
}) => {
  return (
    <Control
      title="수정"
      action={
        // bucket의 수정을 위한 페이즈를 연다.
        openBucketEditPhase
      }
    >
      <EditControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default BucketEditControl;
