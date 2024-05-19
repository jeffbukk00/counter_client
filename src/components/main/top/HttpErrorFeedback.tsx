import HoverWrapper from "@/components/styles/HoverWrapper";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import CloseVector from "@/shared/assets/CloseVector";
import WarnTriangleVector from "@/shared/assets/warn/WarnTriangleVector";

const HttpErrorFeedback = () => {
  const { asyncErrorState, closeAsyncError } = useAsyncErrorContext();

  return (
    <>
      {asyncErrorState.isError && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center border border-negative rounded-md p-2 z-[105]">
          <span className="mr-2">
            <WarnTriangleVector classes="w-8 h-8" color="#FA7070" />
          </span>
          <div className="mr-3">
            <p className="text-negative">
              <span className="text-sm text-gray-300">
                요청이 실패했습니다:{" "}
              </span>
              {asyncErrorState.message}
            </p>
          </div>

          <button onClick={closeAsyncError}>
            <HoverWrapper classes="p-1 flex items-center">
              <CloseVector classes="w-5 h-5 inline-block" color="#FA7070" />
            </HoverWrapper>
          </button>
        </div>
      )}
    </>
  );
};

export default HttpErrorFeedback;
