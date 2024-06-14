import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// counter 수정을 위한 비동기 요청.
const editCounter = (counterId: string) => {
  return async (counterData: {
    title: string;
    startCount: number;
    endCount: number;
  }) => {
    return await axiosInstance().put(
      api.counter.editCounter(counterId),
      counterData
    );
  };
};

// counter 수정을 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationEditCounter = (counterId: string) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateEditCounter } = useMutation({
    mutationFn: editCounter(counterId),
    onSuccess: () => {
      // counter 수정을 위한 비동기 요청이 성공 했을 시,
      // 해당 counter의 데이터를 불러오는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);
    },
    onError: () => {
      // counter 수정을 위한 비동기 요청이 실패 했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("카운터 수정에 실패했습니다");
    },
  });

  return { mutateEditCounter };
};

export default useMutationEditCounter;
