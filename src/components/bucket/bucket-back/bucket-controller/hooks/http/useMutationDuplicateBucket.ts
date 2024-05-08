import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

const duplicateBucket = async (bucketId: string) => {
  return await axiosInstance.post(api.bucket.duplicateBucket(bucketId));
};

const useMutationDuplicateBucket = (bucketId: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateDuplicateBucket } = useMutation({
    mutationFn: () => duplicateBucket(bucketId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
    },
  });

  return { mutateDuplicateBucket };
};

export default useMutationDuplicateBucket;
