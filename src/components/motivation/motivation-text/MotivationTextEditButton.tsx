import EditControlVector from "@/components/ui/control/assets/EditControlVector";

const MotivationTextEditButton = ({
  openEditPhase,
}: {
  openEditPhase: () => void;
}) => {
  return (
    <button onClick={openEditPhase}>
      <EditControlVector />
    </button>
  );
};

export default MotivationTextEditButton;