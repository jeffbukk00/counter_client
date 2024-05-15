import { loadingConstants } from "./constants";
import LoadingSpinner from "./LoadingSpinner";

const LoadingFeedbackGlobal = () => {
  return (
    <div className="w-screen h-screen z-[99] bg-white opacity-80 flex justify-center items-center fixed top-0 left-0">
      <LoadingSpinner size={loadingConstants.loadingSpinnerSize["x-large"]} />
    </div>
  );
};

export default LoadingFeedbackGlobal;
