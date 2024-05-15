import LoadingFeedbackBoxesContainer from "../user-feedback/loading/LoadingFeedbackBoxesContainer";
import { BoxesContainerPropsType } from "./types";

const BoxesContainer = ({ isFetching, children }: BoxesContainerPropsType) => {
  return (
    <div className="w-9/10 ml-1/20 mr-1/20 relative flex justify-center items-center">
      {isFetching && <LoadingFeedbackBoxesContainer />}
      <div className="w-full h-full grid grid-cols-3 grid-flow-row auto-rows-max">
        {children}
      </div>
    </div>
  );
};

export default BoxesContainer;
