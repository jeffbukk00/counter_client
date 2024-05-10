import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const editCounter = (counterId: string) => {
  return async (counterData: {
    title: string;
    startCount: number;
    endCount: number;
  }) => {
    return await axiosInstance.put(
      api.counter.editCounter(counterId),
      counterData
    );
  };
};

const useMutationEditCounter = (counterId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateEditCounter } = useMutation({
    mutationFn: editCounter(counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });
    },
  });

  return { mutateEditCounter };
};

export default useMutationEditCounter;
