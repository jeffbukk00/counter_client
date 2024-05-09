import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

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
  const queryClient = useQueryClient();
  const { mutate: mutateCreateCounter } = useMutation({
    mutationFn: createCounter(bucketId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
      });
    },
  });

  return { mutateCreateCounter };
};

export default useMutationCreateCounter;
