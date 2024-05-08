import { CreationActionButtonPropsType } from "./types";
import { creationActionConstants } from "./constants";

import CreationActionButtonVector from "./assets/CreationActionButtonVector";

const CreationActionButton = ({
  isInLastPhase,
  type,
  actionHandler,
}: CreationActionButtonPropsType) => {
  return (
    <>
      {isInLastPhase &&
        type === creationActionConstants.creationActionType.submit && (
          <button onClick={actionHandler}>
            <CreationActionButtonVector type={type} />
          </button>
        )}
      {!isInLastPhase &&
        type === creationActionConstants.creationActionType.click && (
          <button onClick={actionHandler}>
            <CreationActionButtonVector type={type} />
          </button>
        )}
    </>
  );
};

export default CreationActionButton;
