import HoverWrapper from "@/components/styles/HoverWrapper";
import EditControlVector from "@/components/ui/control/assets/EditControlVector";

const MotivationTextEditButton = ({
  openEditPhase,
}: {
  openEditPhase: () => void;
}) => {
  return (
    <span className="ml-2">
      <HoverWrapper classes="inline-block">
        <button onClick={openEditPhase}>
          <EditControlVector classes="inline-block w-5 h-5" />
        </button>
      </HoverWrapper>
    </span>
  );
};

export default MotivationTextEditButton;
