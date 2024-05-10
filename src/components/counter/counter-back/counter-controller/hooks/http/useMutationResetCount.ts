import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const resetCount = async (counterId: string) => {
  return await axiosInstance.patch(api.counter.resetCount(counterId));
};

const useMutationResetCount = (counterId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateResetCount } = useMutation({
    mutationFn: () => resetCount(counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });
    },
  });

  return { mutateResetCount };
};

export default useMutationResetCount;
