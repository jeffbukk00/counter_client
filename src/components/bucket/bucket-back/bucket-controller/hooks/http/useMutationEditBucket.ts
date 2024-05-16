import { useMutation, useQueryClient } from "@tanstack/react-query";

import useBoxLoadingContext from "@/contexts/loading/box-loading/hooks/useBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

import { axiosInstance } from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

const editBucket = (bucketId: string) => {
  return async (bucketData: { title: string }) => {
    return await axiosInstance.put(api.bucket.editBucket(bucketId), bucketData);
  };
};

const useMutationEditBucket = (bucketId: string) => {
  const { inactivate } = useBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();
  const queryClient = useQueryClient();
  const { mutate: mutateEditBucket } = useMutation({
    mutationFn: editBucket(bucketId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.bucket.useQueryBucket(bucketId),
      });
      inactivate(bucketId);
    },
    onError: () => {
      inactivate(bucketId);
      openAsyncError("버킷 수정에 실패했습니다");
    },
  });

  return { mutateEditBucket };
};

export default useMutationEditBucket;
