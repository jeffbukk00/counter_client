import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateAchievementStack = (counterId: string) => {
  return async (updatedAchievementStack: number) => {
    return await axiosInstance.patch(
      api.counter.updateAchievementStack(counterId),
      { updatedAchievementStack }
    );
  };
};

const useMutationUpdateAchievementStack = (counterId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateUpdateAchievementStack } = useMutation({
    mutationFn: updateAchievementStack(counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });
    },
  });

  return { mutateUpdateAchievementStack };
};

export default useMutationUpdateAchievementStack;
