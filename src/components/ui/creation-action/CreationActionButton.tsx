import { CreationActionButtonPropsType } from "./types";
import { creationActionConstants } from "./constants";

import CreationActionButtonVector from "./assets/CreationActionButtonVector";
import HoverWrapper from "@/components/styles/HoverWrapper";

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
