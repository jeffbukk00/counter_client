import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

const mergeBucket = (bucketIdSubject: string) => {
  return async (bucketIdObject: string) => {
    return await axiosInstance.post(api.bucket.mergeBucket(bucketIdSubject), {
      bucketIdObject,
    });
  };
};

const useMutationMergeBucket = (bucketIdSubject: string) => {
  const queryClient = useQueryClient();
  const { mutate: mutateMergeBucket } = useMutation({
    mutationFn: mergeBucket(bucketIdSubject),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
    },
  });

  return { mutateMergeBucket };
};

export default useMutationMergeBucket;
