import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/axios/axiosInstance";
import { BucketDataType } from "../../types";
import { api } from "@/tanstack-query/api";
import { constantsInQueryKeys } from "@/tanstack-query/queryKeys";

import useNotBoxLoadingContext from "@/contexts/loading/not-box-loading/hooks/useNotBoxLoadingContext";
import useAsyncErrorContext from "@/contexts/async-error/hooks/useAsyncErrorContext";

// bucket 생성을 위한 비동기 요청.
const createBucket = async (bucketData: BucketDataType) => {
  return await axiosInstance().post(api.bucket.createBucket, {
    data: { title: bucketData.title },
  });
};

// bucket 생성을 위한 비동기 요청을 담고 있는 커스텀 훅.
const useMutationCreateBuckets = () => {
  const { inactivateBoxCreator } = useNotBoxLoadingContext();

  const { openAsyncError } = useAsyncErrorContext();

  const queryClient = useQueryClient();
  const { mutate: mutateCreateBucket } = useMutation({
    mutationFn: createBucket,
    onSuccess: () => {
      // bucket 생성을 위한 비동기 요청 성공 시,
      // 로딩 상태를 위한 유저 피드백 종료.
      inactivateBoxCreator();
      // 모든 bucket들의 id 리스트를 관리하는 비동기 요청의 캐시 업데이트.
      queryClient.invalidateQueries({
        queryKey: [constantsInQueryKeys.buckets],
      });
    },
    onError: () => {
      // bucket 생성을 위한 비동기 요청 실패 시,
      // 로딩 상태를 위한 유저 피드백 종료.
      inactivateBoxCreator();

      // 비동기 요청에서 에러가 발생 했을 때, 유저 피드백.
      openAsyncError("버킷 생성에 실패했습니다");
    },
  });

  return { mutateCreateBucket };
};

export default useMutationCreateBuckets;
