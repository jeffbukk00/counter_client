import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

const createCounter = (bucketId: string) => {
  return async (counterData: {
    title: string;
    startCount: number;
    endCount: number;
  }) => {
    return await axiosInstance.post(
      api.counter.createCounter(bucketId),
      counterData
    );
  };
};

const useMutationCreateCounter = (bucketId: string) => {
  const { inactivateBoxCreator } = useNotBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateCreateCounter, isPending } = useMutation({
    mutationFn: createCounter(bucketId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
      });
      inactivateBoxCreator();
    },
    onError: () => {
      inactivateBoxCreator();
      openAsyncError("카운터 생성에 실패했습니다");
    },
  });

  return { mutateCreateCounter, isPending };
};

export default useMutationCreateCounter;
