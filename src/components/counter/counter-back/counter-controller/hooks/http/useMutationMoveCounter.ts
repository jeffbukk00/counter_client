import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// counter 이동을 위한 비동기 요청.
const moveCounter = (bucketIdSubject: string, counterId: string) => {
  return async (bucketIdObject: string) => {
    return await axiosInstance().post(
      api.counter.moveCounter(bucketIdSubject, counterId),
      { bucketIdObject }
    );
  };
};

// counter 이동을 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationMoveCounter = (
  bucketIdSubject: string,
  counterId: string,
  closeModal: () => void
) => {
  const { inactivateModal } = useNotBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateMoveCounter } = useMutation({
    mutationFn: moveCounter(bucketIdSubject, counterId),
    onSuccess: () => {
      // counter 이동을 위한 비동기 요청이 성공 했을 시,
      // bucket이 담고 있는 모든 카운터들의 id 리스트를 불러오는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.counters],
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // 모달 닫기.
      closeModal();
    },
    onError: () => {
      // counter 이동을 위한 비동기 요청이 성공 했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateModal();

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("카운터 이동에 실패했습니다");
    },
  });

  return { mutateMoveCounter };
};

export default useMutationMoveCounter;
