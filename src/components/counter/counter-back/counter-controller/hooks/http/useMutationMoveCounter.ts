import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

const moveCounter = (bucketIdSubject: string, counterId: string) => {
  return async (bucketIdObject: string) => {
    return await axiosInstance.post(
      api.counter.moveCounter(bucketIdSubject, counterId),
      { bucketIdObject }
    );
  };
};

const useMutationMoveCounter = (bucketIdSubject: string, counterId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateMoveCounter } = useMutation({
    mutationFn: moveCounter(bucketIdSubject, counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.counters],
      });
    },
  });

  return { mutateMoveCounter };
};

export default useMutationMoveCounter;
