import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import CloseVector from "@/shared/assets/CloseVector";

const HttpErrorFeedback = () => {
  const { asyncErrorState, closeAsyncError } = useAsyncErrorContext();

  return (
    <>
      {asyncErrorState.isError && (
        <div>
          <p className="text-negative">{asyncErrorState.message}</p>
          <button onClick={closeAsyncError}>
            <CloseVector classes="w-6 h-6 inline-block" />
          </button>
        </div>
      )}
    </>
  );
};

export default HttpErrorFeedback;
