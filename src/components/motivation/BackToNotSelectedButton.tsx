import GotoPrevPhaseButtonVector from "../ui/navigator/assets/GotoPrevPhaseButtonVector";

const BackToNotSelectedButton = ({
  backToNotSelected,
}: {
  backToNotSelected: () => void;
}) => {
  return (
    <button onClick={backToNotSelected}>
      <GotoPrevPhaseButtonVector />
    </button>
  );
};

export default BackToNotSelectedButton;
