import { StartCreationButtonPropsType } from "./types";

import StartCreationButtonVector from "./assets/StartCreationButtonVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

// 클릭하면 box 생성을 시작하는 버튼 컴포넌트.
const StartCreationButton = ({
  startCreation,
  classes,
  hover,
}: StartCreationButtonPropsType) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <button onClick={startCreation}>
        <HoverWrapper classes={hover}>
          <StartCreationButtonVector classes={classes} />
        </HoverWrapper>
      </button>
    </div>
  );
};

export default StartCreationButton;
