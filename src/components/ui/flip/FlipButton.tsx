import FlipButtonVector from "./assets/FlipButtonVector";
import { FlipButtonPropsType } from "./types";

const FlipButton = ({ flip }: FlipButtonPropsType) => {
  return (
    <button onClick={flip}>
      <FlipButtonVector />
    </button>
  );
};

export default FlipButton;
