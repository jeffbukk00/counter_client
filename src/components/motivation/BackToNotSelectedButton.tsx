import HoverWrapper from "../styles/HoverWrapper";
import GotoPrevPhaseButtonVector from "../ui/navigator/assets/GotoPrevPhaseButtonVector";

const BackToNotSelectedButton = ({
  backToNotSelected,
  classes,
}: {
  backToNotSelected: () => void;
  classes: string;
}) => {
  return (
    <HoverWrapper classes="p-1">
      {" "}
      <button onClick={backToNotSelected}>
        <GotoPrevPhaseButtonVector classes={classes} />
      </button>
    </HoverWrapper>
  );
};

export default BackToNotSelectedButton;
