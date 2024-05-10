import { useQueryClient, useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const removeCounter = async (bucketId: string, counterId: string) => {
  return await axiosInstance.delete(
    api.counter.removeCounter(bucketId, counterId)
  );
};

const useMutationRemoveCounter = (bucketId: string, counterId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateRemoveConter } = useMutation({
    mutationFn: () => removeCounter(bucketId, counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
      });
    },
  });

  return { mutateRemoveConter };
};

export default useMutationRemoveCounter;
