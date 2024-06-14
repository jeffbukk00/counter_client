import { CreationActionButtonPropsType } from "./types";
import { creationActionConstants } from "./constants";

import CreationActionButtonVector from "./assets/CreationActionButtonVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

// bucket 혹은 counter를 생성할 때의 action 역할을 하는 버튼 컴포넌트.
// 다음 페이즈로 넘어가는 경우와 최종적으로 서버에 생성을 제출할 때의 경우가 다름.
const CreationActionButton = ({
  isInLastPhase,
  type,
  actionHandler,
  classes,
  hover,
}: CreationActionButtonPropsType) => {
  return (
    <HoverWrapper classes={`flex justify-center items-center ${hover}`}>
      {isInLastPhase &&
        type === creationActionConstants.creationActionType.submit && (
          <button
            className="flex justify-center items-center"
            onClick={actionHandler}
          >
            <CreationActionButtonVector type={type} classes={classes} />
          </button>
        )}
      {!isInLastPhase &&
        type === creationActionConstants.creationActionType.click && (
          <button
            className="flex justify-center items-center"
            onClick={actionHandler}
          >
            <CreationActionButtonVector type={type} classes={classes} />
          </button>
        )}
    </HoverWrapper>
  );
};

export default CreationActionButton;
