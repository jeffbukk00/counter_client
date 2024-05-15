import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const removeBucket = async (bucketId: string) => {
  return axiosInstance.delete(api.bucket.deleteBucket(bucketId));
};

const useMutationRemoveBucket = (bucketId: string) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateRemoveBucket } = useMutation({
    mutationFn: () => removeBucket(bucketId),
    onSuccess: () => {
      inactivate(bucketId);
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
    },
    onError: () => {
      inactivate(bucketId);

      openAsyncError("버킷 삭제에 실패했습니다");
    },
  });

  return { mutateRemoveBucket };
};

export default useMutationRemoveBucket;
