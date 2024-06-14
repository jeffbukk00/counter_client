import { loadingConstants } from "./constants";

import LoadingSpinner from "./LoadingSpinner";

// 전역에서 호출 된 비동기 요청의 로딩 상태에 대한 유저 피드백을 보여주는 컴포넌트.
const LoadingFeedbackGlobal = () => {
  return (
    <div className="w-screen h-screen z-[104] bg-white opacity-60 flex justify-center items-center fixed top-0 left-0">
      <LoadingSpinner size={loadingConstants.loadingSpinnerSize["x-large"]} />
    </div>
  );
};

export default LoadingFeedbackGlobal;
