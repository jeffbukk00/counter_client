import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

const removeBucket = async (bucketId: string) => {
  return axiosInstance.delete(api.bucket.deleteBucket(bucketId));
};

const useMutationRemoveBucket = (bucketId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateRemoveBucket } = useMutation({
    mutationFn: () => removeBucket(bucketId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
    },
  });

  return { mutateRemoveBucket };
};

export default useMutationRemoveBucket;
