import { loadingConstants } from "./constants";

import LoadingSpinner from "./LoadingSpinner";

// box-continaer에서 호출 된 비동기 요청의 로딩 상태에 대한 유저 피드백을 보여주는 컴포넌트.
const LoadingFeedbackBoxesContainer = () => {
  return (
    <div className="w-full h-full bg-white opacity-60 flex justify-center items-center absolute top-0 left-0 z-[102]">
      <LoadingSpinner size={loadingConstants.loadingSpinnerSize.large} />
    </div>
  );
};

export default LoadingFeedbackBoxesContainer;
