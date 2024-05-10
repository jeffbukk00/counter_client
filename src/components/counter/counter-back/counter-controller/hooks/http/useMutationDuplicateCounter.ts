import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const duplicateCounter = async (bucketId: string, counterId: string) => {
  return await axiosInstance.post(
    api.counter.duplicateCounter(bucketId, counterId)
  );
};

const useMutationDuplicateCounter = (bucketId: string, counterId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateDuplicateCounter } = useMutation({
    mutationFn: () => duplicateCounter(bucketId, counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
      });
    },
  });

  return { mutateDuplicateCounter };
};

export default useMutationDuplicateCounter;
