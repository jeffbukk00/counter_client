import HoverWrapper from "../styles/HoverWrapper";
import GotoPrevPhaseButtonVector from "../ui/navigator/assets/GotoPrevPhaseButtonVector";

// 클릭하면, motivation 타입 선택 이전으로 되돌리는 버튼 컴포넌트.
const BackToNotSelectedButton = ({
  backToNotSelected,
  classes,
}: {
  backToNotSelected: () => void;
  classes: string;
}) => {
  return (
    <HoverWrapper classes="p-1">
      <button onClick={backToNotSelected}>
        <GotoPrevPhaseButtonVector classes={classes} />
      </button>
    </HoverWrapper>
  );
};

export default BackToNotSelectedButton;
