import { loadingConstants } from "./constants";
import LoadingSpinner from "./LoadingSpinner";

const LoadingFeedbackModal = () => {
  return (
    <div className="w-full h-full bg-white opacity-80 flex justify-center items-center absolute top-0 left-0 z-[99]">
      <LoadingSpinner size={loadingConstants.loadingSpinnerSize.medium} />
    </div>
  );
};

export default LoadingFeedbackModal;
