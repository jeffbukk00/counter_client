import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

import HoverWrapper from "@/components/styles/HoverWrapper";
import CloseVector from "@/shared/assets/CloseVector";
import WarnTriangleVector from "@/shared/assets/warn/WarnTriangleVector";

// 어플리케이션 내 모든 비동기 요청들에서 에러 발생 시, 에러의 내용을 표시하는 컴포넌트.
const HttpErrorFeedback = () => {
  // 비동기 요청의 에러와 관련한 상태를 관리하는 커스텀 훅.
  const { asyncErrorState, closeAsyncError } = useAsyncErrorContext();

  return (
    <>
      {asyncErrorState.isError && (
        <div className="absolute bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center border border-negative rounded-md p-2 z-[103]">
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
