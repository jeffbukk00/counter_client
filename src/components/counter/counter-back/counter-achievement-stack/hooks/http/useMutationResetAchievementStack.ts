import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

const resetAchievementStack = async (counterId: string) => {
  return await axiosInstance.patch(
    api.counter.resetAchievementStack(counterId)
  );
};

const useMutationResetAchievementStack = (counterId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateResetAchievementStack } = useMutation({
    mutationFn: () => resetAchievementStack(counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });
    },
  });

  return { mutateResetAchievementStack };
};

export default useMutationResetAchievementStack;
