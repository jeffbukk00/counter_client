import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";

// counter 생성을 위한 비동기 요청.
const createCounter = (bucketId: string) => {
  return async (counterData: {
    title: string;
    startCount: number;
    endCount: number;
  }) => {
    return await axiosInstance().post(
      api.counter.createCounter(bucketId),
      counterData
    );
  };
};

// counter 생성을 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationCreateCounter = (bucketId: string) => {
  const { inactivateBoxCreator } = useNotBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateCreateCounter, isPending } = useMutation({
    mutationFn: createCounter(bucketId),
    onSuccess: () => {
      // counter 생성을 위한 비동기 요청 성공 시,
      // bucket이 담고 있는 모든 counter들의 id 리스트를 불러오는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounterIds(bucketId),
      });

      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateBoxCreator();
    },
    onError: () => {
      // counter 생성을 위한 비동기 요청 실패 시,
      // 비동기 요청이 끝난 후, 로딩 상태에 대한 유저 피드백 종료.
      inactivateBoxCreator();

      // 비동기 요청이 실패 했을 때, 유저 피드백.
      openAsyncError("카운터 생성에 실패했습니다");
    },
  });

  return { mutateCreateCounter, isPending };
};

export default useMutationCreateCounter;
