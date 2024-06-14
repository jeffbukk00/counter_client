import Control from "@/components/ui/control/Control";
import EditControlVector from "@/components/ui/control/assets/EditControlVector";

// controller의 control들 중, counter 수정을 위한 control.
const CounterEditControl = ({
  openCounterEditPhase,
}: {
  openCounterEditPhase: () => void;
}) => {
  return (
    <Control
      title="수정"
      action={
        // counter 수정 페이즈를 연다.
        openCounterEditPhase
      }
    >
      <EditControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default CounterEditControl;
