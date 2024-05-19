import HoverWrapper from "@/components/styles/HoverWrapper";
import EditControlVector from "@/components/ui/control/assets/EditControlVector";

const MotivationLinkEditButton = ({
  openEditPhase,
}: {
  openEditPhase: () => void;
}) => {
  return (
    <span className="">
      <HoverWrapper classes="inline-block">
        <button onClick={openEditPhase}>
          <EditControlVector classes="w-4 h-4 inline-block" />
        </button>
      </HoverWrapper>
    </span>
  );
};

export default MotivationLinkEditButton;
