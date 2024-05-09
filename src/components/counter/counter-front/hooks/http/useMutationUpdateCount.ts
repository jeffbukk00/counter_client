import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import queryKeys from "@/tanstack-query/queryKeys";
import { useEffect } from "react";

const updateCount = (counterId: string) => {
  return async (updatedCurrentCount: number) => {
    return axiosInstance.patch(api.counter.updateCount(counterId), {
      updatedCurrentCount,
    });
  };
};

const useMutationUpdateCount = (counterId: string, currentCount: number) => {
  const queryClient = useQueryClient();
  const { mutate: mutateUpdateCount } = useMutation({
    mutationFn: updateCount(counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.counter.useQueryCounter(counterId),
      });
    },
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      mutateUpdateCount(currentCount);
    }, 800);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentCount, mutateUpdateCount]);
};

export default useMutationUpdateCount;
