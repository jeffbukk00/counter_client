import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const mergeBucket = (bucketIdSubject: string) => {
  return async (bucketIdObject: string) => {
    return await axiosInstance.post(api.bucket.mergeBucket(bucketIdSubject), {
      bucketIdObject,
    });
  };
};

const useMutationMergeBucket = (
  bucketIdSubject: string,
  closeModal: () => void
) => {
  const { inactivateModal } = useNotBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateMergeBucket } = useMutation({
    mutationFn: mergeBucket(bucketIdSubject),
    onSuccess: () => {
      inactivateModal();
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
      closeModal();
    },
    onError: () => {
      inactivateModal();
      openAsyncError("버킷 병합에 실패했습니다");
      closeModal();
    },
  });

  return { mutateMergeBucket };
};

export default useMutationMergeBucket;
