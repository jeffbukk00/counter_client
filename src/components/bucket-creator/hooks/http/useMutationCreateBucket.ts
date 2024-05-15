import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/axios/axiosInstance";
import { BucketDataType } from "../../types";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";
import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

const createBucket = async (bucketData: BucketDataType) => {
  return await axiosInstance.post(api.bucket.createBucket, {
    data: { title: bucketData.title },
  });
};

const useMutationCreateBuckets = () => {
  const { inactivateBoxCreator } = useNotBoxLoadingContext();
  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();

  const { mutate: mutateCreateBucket } = useMutation({
    mutationFn: createBucket,
    onSuccess: () => {
      inactivateBoxCreator();
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
    },
    onError: () => {
      inactivateBoxCreator();
      openAsyncError("버킷 생성에 실패했습니다");
    },
  });

  return { mutateCreateBucket };
};

export default useMutationCreateBuckets;
