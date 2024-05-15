import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const duplicateBucket = async (bucketId: string) => {
  return await axiosInstance.post(api.bucket.duplicateBucket(bucketId));
};

const useMutationDuplicateBucket = (bucketId: string) => {
  const { openAsyncError } = useAsyncErrorContext();
  const { inactivate } = useBoxLoadingContext();
  const queryClient = useQueryClient();
  const { mutate: mutateDuplicateBucket } = useMutation({
    mutationFn: () => duplicateBucket(bucketId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
      inactivate(bucketId);
    },
    onError: () => {
      inactivate(bucketId);

      openAsyncError("버킷 복제에 실패했습니다");
    },
  });

  return { mutateDuplicateBucket };
};

export default useMutationDuplicateBucket;
