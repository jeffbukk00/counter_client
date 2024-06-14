import { useQueryClient, useMutation } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// counter 제거를 위한 비동기 요청.
const removeCounter = async (bucketId: string, counterId: string) => {
  return await axiosInstance().delete(
    api.counter.removeCounter(bucketId, counterId)
  );
};

// counter 제거를 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationRemoveCounter = (bucketId: string, counterId: string) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateRemoveConter, isPending } = useMutation({
    mutationFn: () => removeCounter(bucketId, counterId),
    onSuccess: () => {
      // counter 제거를 위한 비동기 요청이 성공 했을 시,
      // bucket이 담고 있는 모든 counter들의 id 리스트를 불러오는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);
    },
    onError: () => {
      // counter 제거를 위한 비동기 요청이 실패 했을 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("카운터 삭제에 실패했습니다");
    },
  });

  return { mutateRemoveConter, isPending };
};

export default useMutationRemoveCounter;
