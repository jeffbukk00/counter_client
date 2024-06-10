import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

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

const useMutationEditCounter = (counterId: string) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateEditCounter } = useMutation({
    mutationFn: editCounter(counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });
      inactivate(counterId);
    },
    onError: () => {
      inactivate(counterId);
      openAsyncError("카운터 수정에 실패했습니다");
    },
  });

  return { mutateEditCounter };
};

export default useMutationEditCounter;
