import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// counter 복제를 위한 비동기 요청.
const duplicateCounter = async (bucketId: string, counterId: string) => {
  return await axiosInstance().post(
    api.counter.duplicateCounter(bucketId, counterId)
  );
};

// counter 복제를 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationDuplicateCounter = (bucketId: string, counterId: string) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateDuplicateCounter } = useMutation({
    mutationFn: () => duplicateCounter(bucketId, counterId),
    onSuccess: () => {
      // counter 복제를 위한 비동기 요청이 성공했을 시,
      // bucket에 속한 모든 counter들의 id를 요청하는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);
    },
    onError: () => {
      // counter 복제를 위한 비동기 요청이 실패했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("카운터 복제에 실패했습니다");
    },
  });

  return { mutateDuplicateCounter };
};

export default useMutationDuplicateCounter;
