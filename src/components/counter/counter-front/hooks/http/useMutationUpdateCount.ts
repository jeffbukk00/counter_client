import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useEffect, useRef } from "react";

import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";

const updateCount = (counterId: string) => {
  return async (updatedCurrentCount: number) => {
    return axiosInstance.patch(api.counter.updateCount(counterId), {
      updatedCurrentCount,
    });
  };
};

const useMutationUpdateCount = (counterId: string, currentCount: number) => {
  const countRef = useRef(0);

  const { activate, inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateUpdateCount } = useMutation({
    mutationFn: updateCount(counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });
      inactivate(counterId);
    },
    onError: () => {
      inactivate(counterId);
      openAsyncError("카운트 업데이트에 실패했습니다");
    },
  });

  useEffect(() => {
    if (countRef.current < 2) {
      countRef.current++;
      return;
    }
    const timerId = setTimeout(() => {
      activate(counterId);
      mutateUpdateCount(currentCount);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentCount, activate, counterId, mutateUpdateCount]);
};

export default useMutationUpdateCount;
