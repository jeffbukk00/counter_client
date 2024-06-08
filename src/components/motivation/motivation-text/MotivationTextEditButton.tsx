import HoverWrapper from "@/components/styles/HoverWrapper";
import EditControlVector from "@/components/ui/control/assets/EditControlVector";

const MotivationTextEditButton = ({
  openEditPhase,
}: {
  openEditPhase: () => void;
}) => {
  return (
    <HoverWrapper classes="inline-block p-[1px]">
      <button
        onClick={openEditPhase}
        className="flex justify-center items-center"
      >
        <EditControlVector classes="inline-block w-5 h-5" />
      </button>
    </HoverWrapper>
  );
};

export default MotivationTextEditButton;
