import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { queryKeys } from "@/tanstack-query/queryKeys";
import { api } from "@/tanstack-query/api";

const editBucket = (bucketId: string) => {
  return async (bucketData: { title: string }) => {
    return await axiosInstance.put(api.bucket.editBucket(bucketId), bucketData);
  };
};

const useMutationEditBucket = (bucketId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateEditBucket } = useMutation({
    mutationFn: editBucket(bucketId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.bucket.useQueryBucket(bucketId),
      });
    },
  });

  return { mutateEditBucket };
};

export default useMutationEditBucket;
