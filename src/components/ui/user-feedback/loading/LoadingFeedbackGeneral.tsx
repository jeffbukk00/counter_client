import { loadingConstants } from "./constants";
import LoadingSpinner from "./LoadingSpinner";

const LoadingFeedbackGeneral = () => {
  return (
    <div className="w-full h-full bg-white opacity-70 flex justify-center items-center absolute top-0 left-0 z-[101]">
      <LoadingSpinner size={loadingConstants.loadingSpinnerSize.small} />
    </div>
  );
};

export default LoadingFeedbackGeneral;
