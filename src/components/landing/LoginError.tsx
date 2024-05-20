import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import WarnTriangleVector from "@/shared/assets/warn/WarnTriangleVector";
import HoverWrapper from "../styles/HoverWrapper";
import CloseVector from "@/shared/assets/CloseVector";

const LoginError = () => {
  const { asyncErrorState, closeAsyncError } = useAsyncErrorContext();

  return (
    <>
      {asyncErrorState.isError && (
        <div className="w-[65%] absolute top-[10%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center border border-negative rounded-md p-2 z-[105]">
          <span className="mr-2">
            <WarnTriangleVector classes="w-6 h-6" color="#FA7070" />
          </span>
          <div className="mr-2">
            <p className="text-negative text-sm">
              <span className="text-xs text-gray-300">
                요청이 실패했습니다:{" "}
              </span>
              {asyncErrorState.message}
            </p>
          </div>
          <button onClick={closeAsyncError}>
            <HoverWrapper classes="p-1 flex items-center">
              <CloseVector classes="w-4 h-4 inline-block" color="#FA7070" />
            </HoverWrapper>
          </button>
        </div>
      )}
    </>
  );
};

export default LoginError;
