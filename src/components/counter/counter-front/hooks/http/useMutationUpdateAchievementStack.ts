import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

// counter의 achievementStack을 업데이트 하는 비동기 요청.
const updateAchievementStack = (counterId: string) => {
  return async (updatedAchievementStack: number) => {
    return await axiosInstance().patch(
      api.counter.updateAchievementStack(counterId),
      { updatedAchievementStack }
    );
  };
};

// counter의 achievementStack을 업데이트 하는 비동기 요청을 호출하는 커스텀 훅.
const useMutationUpdateAchievementStack = (counterId: string) => {
  const { inactivate } = useBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateUpdateAchievementStack } = useMutation({
    mutationFn: updateAchievementStack(counterId),
    onSuccess: () => {
      // counter의 achievementStack을 업데이트 하는 비동기 요청이 성공했을 시,
      // 해당 counter의 데이터를 가져오는 비동기 요청의 캐시를 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });

      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);
    },
    onError: () => {
      // counter의 achievementStack을 업데이트 하는 비동기 요청이 실패했을 시,
      // 비동기 요청의 로딩 상태에 대한 유저 피드백 종료.
      inactivate(counterId);

      // 비동기 요청 실패에 따른 유저 피드백.
      openAsyncError("카운터 성취 스택 업데이트에 실패했습니다");
    },
  });

  return { mutateUpdateAchievementStack };
};

export default useMutationUpdateAchievementStack;
