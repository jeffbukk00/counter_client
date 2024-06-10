import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const moveCounter = (bucketIdSubject: string, counterId: string) => {
  return async (bucketIdObject: string) => {
    return await axiosInstance().post(
      api.counter.moveCounter(bucketIdSubject, counterId),
      { bucketIdObject }
    );
  };
};

const useMutationMoveCounter = (
  bucketIdSubject: string,
  counterId: string,
  closeModal: () => void
) => {
  const { inactivateModal } = useNotBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateMoveCounter } = useMutation({
    mutationFn: moveCounter(bucketIdSubject, counterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.counters],
      });
      inactivateModal();
      closeModal();
    },
    onError: () => {
      inactivateModal();
      openAsyncError("카운터 이동에 실패했습니다");
    },
  });

  return { mutateMoveCounter };
};

export default useMutationMoveCounter;
