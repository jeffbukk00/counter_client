import EditControlVector from "@/components/ui/control/assets/EditControlVector";

const MotivationLinkEditButton = ({
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

export default MotivationLinkEditButton;
