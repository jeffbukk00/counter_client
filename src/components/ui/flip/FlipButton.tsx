import HoverWrapper from "@/components/styles/HoverWrapper";
import FlipButtonVector from "./assets/FlipButtonVector";
import { FlipButtonPropsType } from "./types";

const FlipButton = ({ flip, classes }: FlipButtonPropsType) => {
  return (
    <span className={`${classes}`}>
      <HoverWrapper
        classes={`absolute top-2 left-2 p-1 flex justify-center items-center`}
      >
        <button onClick={flip}>
          <FlipButtonVector classes="w-6 h-6" />
        </button>
      </HoverWrapper>
    </span>
  );
};

export default FlipButton;
