import Control from "@/components/ui/control/Control";
import EditControlVector from "@/components/ui/control/assets/EditControlVector";
const CounterEditControl = ({
  openCounterEditPhase,
}: {
  openCounterEditPhase: () => void;
}) => {
  return (
    <Control title="수정" action={openCounterEditPhase}>
      <EditControlVector />
    </Control>
  );
};

export default CounterEditControl;
