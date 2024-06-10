import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const duplicateCounter = async (bucketId: string, counterId: string) => {
  return await axiosInstance().post(
    api.counter.duplicateCounter(bucketId, counterId)
  );
};

const useMutationDuplicateCounter = (bucketId: string, counterId: string) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateDuplicateCounter } = useMutation({
    mutationFn: () => duplicateCounter(bucketId, counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
      });
      inactivate(counterId);
    },
    onError: () => {
      inactivate(counterId);
      openAsyncError("카운터 복제에 실패했습니다");
    },
  });

  return { mutateDuplicateCounter };
};

export default useMutationDuplicateCounter;
