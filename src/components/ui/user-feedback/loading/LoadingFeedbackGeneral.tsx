import { loadingConstants } from "./constants";

import LoadingSpinner from "./LoadingSpinner";

// 비동기 요청의 로딩 상태에 대한 유저 피드백을 보여주는 컴포넌트.
// 특정 컴포넌트 종류에 속하지 않음.
const LoadingFeedbackGeneral = () => {
  return (
    <div className="w-full h-full bg-white opacity-70 flex justify-center items-center absolute top-0 left-0 z-[101]">
      <LoadingSpinner size={loadingConstants.loadingSpinnerSize.small} />
    </div>
  );
};

export default LoadingFeedbackGeneral;
