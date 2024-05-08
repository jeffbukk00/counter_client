import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { BucketDataType } from "../../types";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

const createBucket = async (bucketData: BucketDataType) => {
  return await axiosInstance.post(api.bucket.createBucket, {
    data: { title: bucketData.title },
  });
};

const useMutationCreateBuckets = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateCreateBucket } = useMutation({
    mutationFn: createBucket,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
    },
  });

  return { mutateCreateBucket };
};

export default useMutationCreateBuckets;
