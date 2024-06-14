import { BoxesContainerPropsType } from "./types";

import LoadingFeedbackBoxesContainer from "../user-feedback/loading/LoadingFeedbackBoxesContainer";

// box들을 담는 컨테이너 역할을 하는 wrapper 컴포넌트.
const BoxesContainer = ({
  isFetching,
  isOneLine,
  children,
}: BoxesContainerPropsType) => {
  return (
    <div className="w-9/10 ml-1/20 mr-1/20 relative flex flex-col justify-center items-center">
      {
        // boxContainer 범위의 비동기 요청들(useQueryBucketIds 또는 useQueryCounterIds)이 로딩 중일 때, 유저 피드백.
        isFetching && <LoadingFeedbackBoxesContainer />
      }
      <div className="w-full h-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-flow-row auto-rows-max">
        {children}
      </div>
      {isOneLine && <div className="w-[90vw] h-[40vh]"></div>}
    </div>
  );
};

export default BoxesContainer;
