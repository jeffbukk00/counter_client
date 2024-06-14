import { FlipButtonPropsType } from "./types";

import HoverWrapper from "@/components/styles/HoverWrapper";
import FlipButtonVector from "./assets/FlipButtonVector";

// box의 앞, 뒷면을 뒤집는 역할을 하는 버튼 컴포넌트.
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
