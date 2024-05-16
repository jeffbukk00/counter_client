import { useQueryClient, useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const removeCounter = async (bucketId: string, counterId: string) => {
  return await axiosInstance.delete(
    api.counter.removeCounter(bucketId, counterId)
  );
};

const useMutationRemoveCounter = (bucketId: string, counterId: string) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateRemoveConter, isPending } = useMutation({
    mutationFn: () => removeCounter(bucketId, counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
      });
      inactivate(counterId);
    },
    onError: () => {
      inactivate(counterId);
      openAsyncError("카운터 삭제에 실패했습니다");
    },
  });

  return { mutateRemoveConter, isPending };
};

export default useMutationRemoveCounter;
