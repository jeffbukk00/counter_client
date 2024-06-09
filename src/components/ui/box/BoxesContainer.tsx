import LoadingFeedbackBoxesContainer from "../user-feedback/loading/LoadingFeedbackBoxesContainer";
import { BoxesContainerPropsType } from "./types";

const BoxesContainer = ({
  isFetching,
  isOneLine,
  children,
}: BoxesContainerPropsType) => {
  return (
    <div className="w-9/10 ml-1/20 mr-1/20 relative flex flex-col justify-center items-center">
      {isFetching && <LoadingFeedbackBoxesContainer />}
      <div className="w-full h-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-flow-row auto-rows-max">
        {children}
      </div>
      {isOneLine && <div className="w-[90vw] h-[40vh]"></div>}
    </div>
  );
};

export default BoxesContainer;
