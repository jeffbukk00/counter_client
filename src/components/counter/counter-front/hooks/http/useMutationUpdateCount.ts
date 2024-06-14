import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

// counter의 count를 업데이트 하기 위한 비동기 요청.
const updateCount = (counterId: string) => {
  return async (updatedCurrentCount: number) => {
    return axiosInstance().patch(api.counter.updateCount(counterId), {
      updatedCurrentCount,
    });
  };
};

// counter의 count를 업데이트 하기 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationUpdateCount = (counterId: string) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateUpdateCount } = useMutation({
    mutationFn: updateCount(counterId),
    onSuccess: () => {
      // counter의 count를 업데이트 하는 비동기 요청이 성공했을 시,
      // 해당 counter의 데이터를 가져오는 비동기 요청의 캐시를 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });

      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);
    },
    onError: () => {
      // counter의 count를 업데이트 하는 비동기 요청이 실패했을 시,
      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);

      // 비동기 요청 실패에 따른 유저 피드백.
      openAsyncError("카운트 업데이트에 실패했습니다");
    },
  });

  return { mutateUpdateCount };
};

export default useMutationUpdateCount;
