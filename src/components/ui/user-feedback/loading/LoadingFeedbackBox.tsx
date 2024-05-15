import { loadingConstants } from "./constants";
import LoadingSpinner from "./LoadingSpinner";

const LoadingFeedbackBox = () => {
  return (
    <div className="w-full h-full bg-white opacity-80 flex justify-center items-center absolute top-0 left-0 z-[99]">
      <LoadingSpinner size={loadingConstants.loadingSpinnerSize.small} />
    </div>
  );
};

export default LoadingFeedbackBox;
