import { loadingConstants } from "./constants";

// 로딩 중임을 나타내는 ui.
const LoadingSpinner = ({ size }: { size: number }) => {
  let loadingSpinner = (
    <div className={`w-[1rem] h-[1rem] relative animate-spinning`}>
      <span className={`w-[0.5rem] h-[1rem] inline-block bg-positive`}></span>
      <span className={`w-[0.5rem] h-[1rem] inline-block bg-negative`}></span>
    </div>
  );

  if (size === loadingConstants.loadingSpinnerSize.medium)
    loadingSpinner = (
      <div className={`w-[2rem] h-[2rem] relative animate-spinning`}>
        <span className={`w-[1rem] h-[2rem] inline-block bg-positive`}></span>
        <span className={`w-[1rem] h-[2rem] inline-block bg-negative`}></span>
      </div>
    );
  if (size === loadingConstants.loadingSpinnerSize.large)
    loadingSpinner = (
      <div className={`w-[3rem] h-[3rem] relative animate-spinning`}>
        <span className={`w-[1.5rem] h-[3rem] inline-block bg-positive`}></span>
        <span className={`w-[1.5rem] h-[3rem] inline-block bg-negative`}></span>
      </div>
    );

  if (size === loadingConstants.loadingSpinnerSize["x-large"])
    loadingSpinner = (
      <div className={`w-[4rem] h-[4rem] relative animate-spinning`}>
        <span className={`w-[2rem] h-[4rem] inline-block bg-positive`}></span>
        <span className={`w-[2rem] h-[4rem] inline-block bg-negative`}></span>
      </div>
    );

  return <>{loadingSpinner}</>;
};

export default LoadingSpinner;
