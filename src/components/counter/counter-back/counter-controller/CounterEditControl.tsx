import Control from "@/components/ui/control/Control";
import EditControlVector from "@/components/ui/control/assets/EditControlVector";
const CounterEditControl = ({
  openCounterEditPhase,
}: {
  openCounterEditPhase: () => void;
}) => {
  return (
    <Control title="수정" action={openCounterEditPhase}>
      <EditControlVector classes="w-5 h-5 inline-block" />
    </Control>
  );
};

export default CounterEditControl;
